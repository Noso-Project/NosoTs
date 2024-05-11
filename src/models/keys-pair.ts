/**
 * Represents a key pair consisting of a public key and a private key.
 */
export class KeysPair {
    /**
     * The public key of the key pair.
     */
    publicKey: string;
  
    /**
     * The private key of the key pair.
     */
    privateKey: string;
  
    /**
     * Constructs a KeyPair with the specified public and private keys.
     * @param publicKey The public key of the key pair.
     * @param privateKey The private key of the key pair.
     */
    constructor(publicKey: string, privateKey: string) {
      this.publicKey = publicKey;
      this.privateKey = privateKey;
    }
  
    /**
     * Checks the validity of the key pair represented by this KeyPair instance.
     * @returns `true` if the length of the public key is 44 characters and the length of the private key is 88 characters, indicating a valid key pair.
     *          `false` otherwise, indicating an invalid key pair.
     *
     * This method is useful for quickly verifying the integrity of the key lengths within the context of the KeyPair instance.
     */
    isValid(): boolean {
      return this.publicKey.length === 44 && this.privateKey.length === 88;
    }
  
    /**
     * Returns a string representation of the key pair in the format "publicKey privateKey".
     * @returns A string representation of the key pair.
     */
    toString(): string {
      return `${this.publicKey} ${this.privateKey}`;
    }
  
    /**
     * Creates a KeyPair object from a space-separated string containing a public key and a private key.
     * @param keys A space-separated string containing a public key and a private key.
     * @returns A KeyPair object created from the provided string.
     */
     fromString(keys: string): KeysPair {
      const keyParts = keys.split(' ');
      const publicKey = keyParts[0];
      const privateKey = keyParts[1];
      return new KeysPair(publicKey, privateKey);
    }
  }
  