import sha256 from "crypto-js/sha256";
import ripemd160 from "crypto-js/ripemd160";
import { ec as EC } from "elliptic";

import { KeysPair } from "./models/keys-pair";
import { NosoConst } from "./const";
interface DivResult {
  coefficient: bigint;
  remainder: bigint;
}

export class NosoCore {
  getTransferHash(value: string): string {
    let hash256 = this.getSha256HashToString(value);
    hash256 = this.base58Encode(hash256, BigInt(58));
    const sumatoria = this.base58Checksum(hash256);
    const bd58 = this.base58DecimalTo58(sumatoria.toString());
    return `tr${hash256}${bd58}`;
  }

  getOrderHash(value: string): string {
    let sha256 = this.getSha256HashToString(value);
    sha256 = this.base58Encode(sha256, BigInt(36));
    return `OR${sha256}`;
  }

  generateKeyPair(): KeysPair {
    const ec = new EC("secp256k1");
    const keyPair = ec.genKeyPair();

    const publicKey = keyPair.getPublic("hex");
    const privateKey = keyPair.getPrivate("hex");

    return new KeysPair(publicKey, privateKey);
  }

  getAddressFromPublicKey(publicKey: string): string {
    const pubSHAHashed = this.getSha256HashToString(publicKey);
    const hash1 = this._getMd160HashToString(pubSHAHashed);
    const hash1Encoded = this.base58Encode(hash1, BigInt(58));
    const sum = this.base58Checksum(hash1Encoded);
    const key = this.base58DecimalTo58(sum.toString());
    const hash2 = hash1Encoded + key;

    return NosoConst.coinChar + hash2;
  }

  base58Encode(hexNumber: string, alphabetNumber: bigint): string {
    let decimalValue = this._hexToDecimal(hexNumber);
    let result = "";

    const alphabetUsed =
      alphabetNumber === BigInt(36)
        ? NosoConst.b36Alphabet
        : NosoConst.b58Alphabet;

    while (decimalValue >= BigInt(58)) {
      const { coefficient, remainder } = this._divideBigInt(
        decimalValue,
        BigInt(58)
      );
      decimalValue = coefficient;
      result = alphabetUsed[Number(remainder)] + result;
    }

    if (decimalValue > BigInt(0)) {
      result = alphabetUsed[Number(decimalValue)] + result;
    }

    return result;
  }

  base58Checksum(input: string): number {
    let total = 0;
    for (let i = 0; i < input.length; i++) {
      const currentChar = input[i];
      const foundIndex = NosoConst.b58Alphabet.indexOf(currentChar);
      if (foundIndex !== -1) {
        total += foundIndex;
      }
    }
    return total;
  }

  base58DecimalTo58(number: string): string {
    let decimalValue = BigInt(number);
    let result = "";

    while (decimalValue >= BigInt(58)) {
      const { coefficient, remainder } = this._divideBigInt(
        decimalValue,
        BigInt(58)
      );
      decimalValue = coefficient;
      result = NosoConst.b58Alphabet[Number(remainder)] + result;
    }

    if (decimalValue > BigInt(0)) {
      result = NosoConst.b58Alphabet[Number(decimalValue)] + result;
    }

    return result;
  }

  getSha256HashToString(publicKey: string): string {
    const hash = sha256(publicKey);
    return hash.toString().toUpperCase();
  }

  private _getMd160HashToString(hash256: string): string {
    const hash = ripemd160(hash256);
    return hash.toString().toUpperCase();
  }

  private _hexToDecimal(hexNumber: string): bigint {
    return BigInt("0x" + hexNumber);
  }

  private _divideBigInt(numerator: bigint, denominator: bigint): DivResult {
    const coefficient = numerator / denominator;
    const remainder = numerator % denominator;
    return { coefficient, remainder };
  }
}

export default NosoCore;
