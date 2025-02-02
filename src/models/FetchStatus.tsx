  class FetchStatus {
    code: number | null;
    constructor(code: number | null) {
      this.code = code;
    }
  }

  export class FetchSuccess extends FetchStatus {
    data: any;
    constructor(code: number, data: any) {
      super(code);
      this.data = data;
    }
  }

  export class FetchError extends FetchStatus {
    message: string;
    code: number;
    constructor( message: string, code?: number ) {
      super(500);
      this.code = code == null ? 500 : code;
      this.message = message;
    }
  }

  export default FetchStatus;  