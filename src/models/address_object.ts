/**
 * Represents an address object in the wallet system.
 */
export class AddressObject {
    hash: string; // Unique identifier for the address
    custom?: string; // Custom alias for the address (optional)
    publicKey: string; // Public key associated with the address
    privateKey: string; // Private key associated with the address
    balance: number; // Current balance of the address
    score: number; // Token balance
    lastOP: number; // Last operation block
    isLocked: boolean; // Indicates whether the address is locked
    incoming: number; // Total incoming transactions
    outgoing: number; // Total outgoing transactions
  
    /**
     * Returns the hash or alias of the address.
     */
    get nameAddressFull(): string {
      return this.custom ?? this.hash;
    }
  
    /**
     * Available balance to perform paid transactions.
     */
    get availableBalance(): number {
      return this.outgoing > this.balance ? 0 : this.balance - this.outgoing;
    }
  
    /**
     * Constructor for creating an AddressObject.
     * @param hash Unique identifier for the address
     * @param custom Custom alias for the address (optional)
     * @param publicKey Public key associated with the address
     * @param privateKey Private key associated with the address
     * @param balance Current balance of the address (default: 0)
     * @param score Token balance (default: 0)
     * @param lastOP Last operation block (default: 0)
     * @param isLocked Indicates whether the address is locked (default: false)
     * @param incoming Total incoming transactions (default: 0)
     * @param outgoing Total outgoing transactions (default: 0)
     */
    constructor({
      hash,
      custom,
      publicKey,
      privateKey,
      balance = 0,
      score = 0,
      lastOP = 0,
      isLocked = false,
      incoming = 0,
      outgoing = 0,
    }: {
      hash: string;
      custom?: string;
      publicKey: string;
      privateKey: string;
      balance?: number;
      score?: number;
      lastOP?: number;
      isLocked?: boolean;
      incoming?: number;
      outgoing?: number;
    }) {
      this.hash = hash;
      this.custom = custom;
      this.publicKey = publicKey;
      this.privateKey = privateKey;
      this.balance = balance;
      this.score = score;
      this.lastOP = lastOP;
      this.isLocked = isLocked;
      this.incoming = incoming;
      this.outgoing = outgoing;
    }
  
    /**
     * Creates a new instance of AddressObject with optional modifications.
     * @param options Options to modify the properties of the address object
     * @returns A new instance of AddressObject with the specified modifications
     */
    copyWith(options: Partial<AddressObject>): AddressObject {
      return new AddressObject({
        hash: options.hash ?? this.hash,
        custom: options.custom ?? this.custom,
        publicKey: this.publicKey,
        privateKey: this.privateKey,
        balance: options.balance ?? this.balance,
        score: options.score ?? this.score,
        lastOP: options.lastOP ?? this.lastOP,
        isLocked: options.isLocked ?? this.isLocked,
        incoming: options.incoming ?? this.incoming,
        outgoing: options.outgoing ?? this.outgoing,
      });
    }
  
    /**
     * Converts the AddressObject to a JSON object suitable for export.
     * @returns A JSON object representing the address object
     */
    toJsonExport(): Record<string, any> {
      return {
        publicKey: this.publicKey,
        privateKey: this.privateKey,
      };
    }
  }
  