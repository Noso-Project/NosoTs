import { NosoConst } from "./const";
import * as cryptos from "crypto";
import * as elliptic from "elliptic";
import { ecdsaSign } from "secp256k1";
import { KJUR } from "jsrsasign";
import { b64tohex } from "jsrsasign";
import { BigInteger } from "jsrsasign";
import * as base64 from "base64-js";
import { KEYUTIL } from "jsrsasign";
import jsrsasign from 'jsrsasign';
interface ECSignature {
  r: bigint;
  s: bigint;
}
export class NosoSigner {
  private _algorithmName = "SHA-1/HMAC";
  private _curve = "secp256k1";
  /*
  verifyKeysPair(keysPair: KeysPair): boolean {
    if (!keysPair.isValid()) {
      return false;
    }
    const signature = this.signMessage(NosoConst.verifyMessage, keysPair.privateKey);
    if (signature === null) {
      return false;
    }
    return this.verifyMessage(NosoConst.verifyMessage, signature, keysPair.publicKey);
  }*/

  signMessage(messages: string, privateKeyBase64s: string): string | null {
    try {
     

      //  const priv = new KJUR.crypto.ECCPrivateKey({ curve: "secp256k1" });
      //  priv.setPrivateKeyHex(privateKeyHex);
      
        ///console.log("privateKey:", privateKeyHex);
        const base64String = "QA0bGlJlO/VCtvR/evSu1nTcjI+EXUNELemUW4g89uc=";
        const message = "VERIFICATION";

        // Перетворення приватного ключа з Base64 в шістнадцятковий формат
        const privateKeyHex = Buffer.from(base64String, "base64").toString("hex");

        // Створення приватного ключа для підпису
        const ecppKey = KEYUTIL.getKey({d: "400d1b1a52653bf542b6f47f7af4aed674dc8c8f845d43442de9945b883cf6e7", curve: "secp256k1"});

        const messageHex = Buffer.from(message, "base64").toString("hex");
        console.log("messageHex:", messageHex); //5444481480804c838d

        
        // Створення об'єкта для підпису
        const signed = new KJUR.crypto.Signature({ alg: "SHA1withECDSA" });

        // Ініціалізація підпису з використанням приватного ключа
        signed.init(ecppKey);

        var sha1 = require('js-sha1');
        sha1.hmac.hex('400d1b1a52653bf542b6f47f7af4aed674dc8c8f845d43442de9945b883cf6e7', messageHex);
        // Оновлення підпису з повідомленням
        signed.updateHex(
            sha1.hmac.hex('400d1b1a52653bf542b6f47f7af4aed674dc8c8f845d43442de9945b883cf6e7', messageHex));

        // Створення підпису
        const sigValueHex = signed.sign();

        // Конвертація підпису в формат base64
        const signatureBase64 = Buffer.from(sigValueHex, "hex").toString("base64");

        console.log("messageHex:", sigValueHex); //5444481480804c838d

        // Вивід підпису у форматі base64
        console.log("Signature:", signatureBase64);

        return signatureBase64;
    } catch (error) {
        console.error("Error creating signature:", error);
        return null;
    }
}
  _encodeSignatureToBase64(signature: elliptic.ec.Signature): string {
    const rBuffer = signature.r;
    console.log(signature);
    console.error("Error creating signature:", rBuffer.toString);
    console.error("Error creating signature:", signature.toDER.toString);
    return "";
  }

  /*
  decodeBase64ToSignature(base64Signature: string): [BigInt, BigInt] {
    const signatureBuffer = Buffer.from(base64Signature, 'base64');
    const r = signatureBuffer.subarray(0, signatureBuffer.length / 2);
    const s = signatureBuffer.subarray(signatureBuffer.length / 2);
    return [BigInt(`0x${r.toString('hex')}`), BigInt(`0x${s.toString('hex')}`)];
  }

  _encodeSignatureToBase64(ecSignature: String): string {
    const rBuffer = Buffer.alloc(32);
    const sBuffer = Buffer.alloc(32);
    rBuffer.writeBigInt64BE(ecSignature.r);
    sBuffer.writeBigInt64BE(ecSignature.s);
    const signatureBuffer = Buffer.concat([rBuffer, sBuffer]);
    return signatureBuffer.toString('base64');
  }
*/
  /*
  verifyMessage(message: string, signature: ECSignature, publicKey: string): boolean {
    try {
      const messageBytes = Buffer.from(this._nosoBase64Decode(message));
      const publicKeyPoint = crypto.createPublicKey({
        key: Buffer.from(publicKey, 'base64'),
        format: 'der',
        type: 'spki'
      });

      const verifier = crypto.createVerify(this._algorithmName);
      verifier.update(messageBytes);
      return verifier.verify(publicKeyPoint, this.encodeSignatureToBase64(signature), 'base64');
    } catch (e) {
      console.error("Error verifying signature:", e);
      return false;
    }
  }

  _bytesToBigInt(bytes: Uint8Array): bigint {
    let result = BigInt(0);
    for (let i = 0; i < bytes.length; i++) {
      result = (result << BigInt(8)) + BigInt(bytes[i]);
    }
    return result;
  }
  */

  _nosoBase64Decode(input: string): number[] {
    const indexList: number[] = [];
    for (const c of input.split("")) {
      const it = NosoConst.b64Alphabet.indexOf(c);
      if (it !== -1) {
        indexList.push(it);
      }
    }

    const binaryString = indexList
      .map((i) => i.toString(2).padStart(6, "0"))
      .join("");

    let strAux = binaryString;
    const tempByteArray: number[] = [];

    while (strAux.length >= 8) {
      const currentGroup = strAux.substring(0, 8);
      const intVal = parseInt(currentGroup, 2);
      tempByteArray.push(intVal);
      strAux = strAux.substring(8);
    }

    return tempByteArray;
  }
}
