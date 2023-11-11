import Head from "next/head";
import { useEffect, useState } from "react";
import { FileInput } from "@/components/FileInput";
import { pdfCheck } from "@/util/utils";
import { AadhaarPdfValidation } from "../util/interface";
import { PasswordInput } from "@/components/PasswordInput";
import { splitToWords, extractWitness } from "anon-aadhaar-pcd";

export default function Home() {
  const [pdfStatus, setpdfStatus] = useState<"" | AadhaarPdfValidation>("");
  const [pdfData, setPdfData] = useState(Buffer.from([]));
  const [provingEnabled, setProvingEnabled] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  // Use the Country Identity hook to get the status of the user.
  const handlePdfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { pdf } = await pdfCheck(e, setpdfStatus);
    setPdfData(pdf);
  };

  useEffect(() => {
    if (
      pdfStatus === AadhaarPdfValidation.SIGNATURE_PRESENT &&
      password !== ""
    ) {
      setProvingEnabled(true);
    } else {
      setProvingEnabled(false);
    }
  }, [pdfStatus, password, pdfData]);

  const startProving = async () => {
    try {
      const tempWitness = await extractWitness(pdfData, password);

      if (tempWitness instanceof Error) throw new Error(tempWitness.message);

      const signature = splitToWords(
        tempWitness.sigBigInt,
        BigInt(64),
        BigInt(32)
      );
      const modulus = splitToWords(
        tempWitness.modulusBigInt,
        BigInt(64),
        BigInt(32)
      );
      const base_message = splitToWords(
        tempWitness.msgBigInt,
        BigInt(64),
        BigInt(32)
      );

      const witness = {
        signature: signature,
        modulus: modulus,
        base_message: base_message,
      };

      (window as any).webkit.messageHandlers.startProvingHandler.postMessage({
        witness,
      });

      return { witness };
    } catch (error) {
      console.log(error);

      (window as any).webkit.messageHandlers.startProvingHandler.postMessage({
        error: error,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Anon Aadhaar Example</title>
        <meta
          name="description"
          content="A Next.js example app that integrate the Anon Aadhaar SDK."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-100 px-4 py-8 text-black">
        <main className="flex flex-col items-center gap-8 bg-white rounded-2xl max-w-screen-sm mx-auto h-[30rem] md:h-[30rem] p-8">
          <h1 className="font-bold text-2xl">
            Welcome to Anon Aadhaar Example
          </h1>
          <p>Prove your Identity anonymously using your Aadhaar card.</p>
          {/* Import the Connect Button component */}
          <div className="flex w-full">
            <FileInput onChange={handlePdfChange} id={"handlePdfChange"} />
          </div>
          <div className="flex w-full">
            <PasswordInput setPassword={setPassword} id={"password"} />
          </div>
          <button
            onClick={() => startProving()}
            disabled={!provingEnabled}
            className={`flex items-center justify-center px-4 py-2 text-white font-bold cursor-pointer shadow-md border-none min-w-[12rem] min-h-[3rem] rounded-md ${
              !provingEnabled
                ? "text-gray-600 bg-gray-300 cursor-default"
                : "bg-gradient-to-r from-green-400 to-blue-400 hover:opacity-70 active:bg-white"
            }`}
          >
            Request Aadhaar Proof
          </button>
        </main>
      </div>
    </>
  );
}
