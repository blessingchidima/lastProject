export enum STATUS {
    OK = 200,
    CREATE = 201,
    BAD = 404,
  }
  
  interface myError {
    errorName: string;
    errorMessage: string;
    errorStatus: STATUS;
    errorSuccess: boolean;
  }
  
  export class errorNotes extends Error {
    public readonly errorName: string;
    public readonly errorMessage: string;
    public readonly errorStatus: STATUS;
    public readonly errorSuccess: boolean = false;
  
    constructor(args: myError) {
      super(args.errorMessage);
  
      Object.setPrototypeOf(this, new.target.prototype);
  
      this.errorName = args.errorName;
      this.errorMessage = args.errorMessage;
      this.errorStatus = args.errorStatus;
  
      if (this.errorStatus !== undefined) {
        this.errorStatus = args.errorStatus;
      }
  
      Error.captureStackTrace(this);
    }
  }
  