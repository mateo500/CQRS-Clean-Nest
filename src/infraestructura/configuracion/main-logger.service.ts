import { Injectable, Logger, Scope } from '@nestjs/common';


//main logger
@Injectable({scope: Scope.TRANSIENT})
export class AppLogger extends Logger {

  public customError(error: Error) {
    super.error(`${error.name}: ${error.message}.`,error.stack, this.context);
  }

}
