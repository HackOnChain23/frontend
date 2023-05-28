import { defineStore } from "pinia";
import { useState } from "nuxt/app";
import Web3 from "web3";
import contractAbi from "~/data/abi_contract.json";
export const useWalletStore = defineStore("wallet", () => {
  const walletAddress = useState<string>("walletAddress");
  const contractResult = useState<string>("contractResult");
  const connected = useState<boolean>("connected");
  const loader = useState<boolean>("loader");
  const tokens = useState("tokens");
  const parts = useState("parts");
  const tokenId = useState("tokenid");

  const getWeb3 = async () => {
    return new Promise(async (resolve, reject) => {
      const web3 = await new Web3(window.ethereum);

      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        resolve(web3);
      } catch (err) {
        reject(err);
      }
    });
  };
  const connectWallet = async () => {
    const web3 = await getWeb3();
    const walletAddressMeta = await web3.eth.requestAccounts();
    walletAddress.value = walletAddressMeta[0];
    connected.value = true;
  };

  const callSmartContract = async (contractAddress: string, json) => {
    const web3 = new Web3(window.ethereum);
    let address = contractAddress;
    let abi = JSON.parse(json);
    console.log(address, json);
    let contract = await new web3.eth.Contract(abi, address);
    contract.methods
      .store(123456789)
      .send({ from: walletAddress.value })
      .then((result) => {
        contractResult.value = result;
      });
  };

  // const upload = async (file: File): Promise<void> => {
  //   const formData = new FormData();
  //   formData.append("first_art", file);

  //   await fetch("https://hoc29.fly.dev/image/", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     })
  // };
  const router = useRouter();

  const safeMintNft = async (contractAddress, json, url, index) => {
    const web3 = new Web3(window.ethereum);
    let address = contractAddress;
    let abi = json;
    let contract = await new web3.eth.Contract(abi, address);
    web3.eth
      .estimateGas({ from: walletAddress.value, gas: 5000000 })
      .then((res) => {
        console.log(res, "estimate");
      });
    const indexRender = index;
    console.log(indexRender, "hiahiahaiahi");
    contract.methods
      .safeMint(walletAddress.value, "image", url, 6, indexRender)
      .send({ from: walletAddress.value, gas: 5000000 })
      .then((result) => {
        console.log(result);
        loader.value = false;
        router.push("/");
      })
      .catch(() => {
        loader.value = false;
      });
  };

  const join = async (json, url, position, id) => {
    const web3 = new Web3(window.ethereum);
    let address = "0x49a985C23CEda09d42AB7e4e3F78718404834b73";
    let abi = json;
    let contract = await new web3.eth.Contract(abi, address);
    console.log(
      json,
      abi,
      walletAddress.value,
      url,
      position,
      id,
      typeof position,
      typeof id,
      "Lechu to dla Ciebie"
    );
    web3.eth.estimateGas({ from: walletAddress.value, gas: 5000000 });
    contract.methods
      .addPart(walletAddress.value, url, position, id)
      .send({ from: walletAddress.value, gas: 5000000 })
      .then((result) => {
        console.log(result);
        loader.value = false;
      })
      .catch((res) => {
        console.log(res);
        loader.value = false;
      });
  };

  const askAi = async (data: string): Promise<void> => {
    let all = { dalle_input: data };
    console.log(JSON.stringify(all));
    try {
      const response = await fetch("https://hoc29.fly.dev/ai-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(all),
      });
      console.log("Server response:", response);

      if (response.ok) {
        const responseBody = await response.json();
        console.log("File uploaded successfully. Response body:", responseBody);
        console.log(responseBody);
        return responseBody;
      } else {
        console.error("File upload failed. Status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred during file upload:", error);
    }
  };

  const getTokens = async (): Promise<void> => {
    const url = `token-ids?wallet=${walletAddress.value}`;
    console.log(url);
    try {
      const response = await fetch(`https://hoc29.fly.dev/${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseBody = await response.json();
        console.log("File uploaded successfully. Response body:", responseBody);
        return responseBody;
      } else {
        console.error("File upload failed. Status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred during file upload:", error);
    }
  };

  const upload = async (
    file: File,
    nameNft,
    descriptionNft,
    indexNft
  ): Promise<void> => {
    const formData = new FormData();
    formData.append("first_art", file);
    try {
      const response = await fetch("https://hoc29.fly.dev/image/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseBody = await response.json();
        console.log("File uploaded successfully. Response body:", responseBody);
        const contractId = process.env.CONTRACT;
        const data = {
          name: nameNft,
          description: descriptionNft,
          image: responseBody.url,
          position: indexNft,
        };
        try {
          console.log(JSON.stringify(data));
          const response = await fetch("https://hoc29.fly.dev/metadata", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            const responseBody = await response.json();
            console.log(
              "File uploaded successfully. Response body:",
              responseBody
            );
            const contractId = process.env.CONTRACT;
            console.log(responseBody);

            safeMintNft(contractId, contractAbi, responseBody, indexNft);
          } else {
            console.error("File upload failed. Status:", response.status);
          }
        } catch (error) {
          console.error("An error occurred during file upload:", error);
        }

        // safeMint(contractId, contractAbi, responseBody.url);
      } else {
        console.error("File upload failed. Status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred during file upload:", error);
    }
  };

  const upgrade = async (
    file: File | string,
    indexNft,
    tokenId
  ): Promise<void> => {
    const formData = new FormData();
    formData.append("first_art", file);
    try {
      const response = await fetch("https://hoc29.fly.dev/image/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseBody = await response.json();
        console.log("File uploaded successfully. Response body:", responseBody);
        const contractId = process.env.CONTRACT;
        const data = {
          image: responseBody.url,
          name: "string",
          description: "string",
          position: indexNft,
          token_id: tokenId,
        };
        console.log(data, "Piotrek");
        try {
          console.log(JSON.stringify(data));
          const response = await fetch("https://hoc29.fly.dev/metadata", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            const responseBody = await response.json();
            console.log(
              "File uploaded successfully. Response body:",
              responseBody
            );
            const contractId = process.env.CONTRACT;
            console.log(responseBody);

            join(contractAbi, responseBody, indexNft, tokenId);
          } else {
            console.error("File upload failed. Status:", response.status);
          }
        } catch (error) {
          console.error("An error occurred during file upload:", error);
        }

        // safeMint(contractId, contractAbi, responseBody.url);
      } else {
        console.error("File upload failed. Status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred during file upload:", error);
    }
  };

  return {
    upload,
    upgrade,
    getWeb3,
    getTokens,
    askAi,
    safeMintNft,
    connectWallet,
    join,
    callSmartContract,
    tokenId,
    walletAddress,
    tokens,
    parts,
  };
});
