import { EConsoleType,EConsoleHexColors } from "./types/types.js";
interface IConsole{
    log() : any;
    error() : any;
    warn(): any;
    info(): any;
}
export default class Console{
    private getTimeStamp(){}
    private print_into(type_console:EConsoleType,color:EConsoleHexColors){}
    public log(){}
    public error(){}
    public warn(){}
    public info(){}
};