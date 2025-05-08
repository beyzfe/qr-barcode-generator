import { QRCode, Barcode } from "@progress/kendo-react-barcodes";
import { Button, Input } from "antd";
import { useState, useRef } from "react";
import { Tabs } from "antd";
import * as htmlToImage from "html-to-image";
import { QrCode, Github } from "lucide-react";

function App() {
  const [inputValue, setInputValue] = useState("test");
  const QrRef = useRef(null);
  const barcodRef = useRef(null);
  const [activeTab, setActiveTab] = useState("1");

  const downloadImage = async () => {
    if (activeTab === "1" && QrRef.current !== null) {
      const dataUrl = await htmlToImage.toPng(QrRef.current);
      const link = document.createElement("a");
      link.download = "indirilmis-qr.png";
      link.href = dataUrl;
      link.click();
    } else if (activeTab === "2" && barcodRef.current !== null) {
      const dataUrl = await htmlToImage.toPng(barcodRef.current);
      const link = document.createElement("a");
      link.download = "indirilmis-barkod.png";
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <>
      <a href="https://github.com/beyzfe" target="_blank">
        <Github className="m-2" />
      </a>
      <div className="shadow w-100 text-center mx-auto mt-50 rounded-xl p-2">
        <span>
          <QrCode className=" mx-auto mb-2" />
        </span>
        <h2 className="font-semibold text-2xl">Create QR Code or Barcode</h2>
        <span className="text-gray-400"> Select your code pattern.</span>
        <Tabs
          defaultActiveKey="1"
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          items={[
            {
              key: "1",
              label: "QR KOD",
              children: (
                <div ref={QrRef}>
                  <QRCode value={inputValue} className=" w-max mx-auto mt-3" />
                </div>
              ),
            },
            {
              key: "2",
              label: "BARKOD",
              children: (
                <div ref={barcodRef}>
                  <Barcode
                    value={inputValue}
                    type="Code128"
                    className=" w-max mx-auto mt-3"
                  />
                </div>
              ),
            },
          ]}
          style={{ textAlign: "center" }}
        />
        <div className="flex flex-col items-center">
          <Input
            style={{ width: "200px", margin: "20px" }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="QR için metin"
          />
          <Button onClick={downloadImage}>Download</Button>
        </div>
      </div>
    </>
  );
}

export default App;
