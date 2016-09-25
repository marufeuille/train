// Type definitions for cheerio-httpcli v0.6.2
// Project: https://github.com/ktty1220/cheerio-httpcli
// Definitions by: yasupeke <https://github.com/yasupeke>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
 
/// <reference path="../cheerio/cheerio.d.ts" />
/// <reference path="../node/node.d.ts" />
 
declare module "cheerio-httpcli" {
    import * as Http from 'http';
    import * as Stream from 'stream';
     
    export interface CheerioHttpcliSelector extends CheerioSelector {
        documentInfo(): DocumentInfo
    }
 
    export interface CheerioHttpcli extends Cheerio {
        click(): Promise<Result>;
        click(callback: (error: Error, $: CheerioHttpcliSelector, response: Response, body: string) => void): Promise<Result>;
        clickSync(): Result;
        submit(): void;
        submit(callback: (error: Error, $: CheerioHttpcliSelector, response: Response, body: string) => void): void;
        submit(param: {[index: string]: string | number}, callback: (error: Error, $: CheerioHttpcliSelector, response: Response, body: string) => void): void;
        submitSync(): void;
        submitSync(param: {[index: string]: string | number}): void;
        field(): {[index: string]: string | number};
        field(name: string): string;
        field(name: {[index: string]: string | number}): void;
        field(name: string, value: string | string[]): void;
        field(name: string, value: string | string[], onNotFound: string): void;
        tick(): void;
        untick(): void;
        url(): string | string[];
        url(filter: {[index: string]: boolean}): string | string[];
        url(srcAttr: string | string[]): string | string[];
        url(filter: {[index: string]: boolean}, srcAttr: string | string[]): string | string[];
        download(): void;
        download(srcAttr: string | string[]): void;
        entityHtml(): string;
    }
 
    export interface DocumentInfo {
        url: string;
        encoding: string;
    }
     
    export interface Response extends Http.IncomingMessage {
        cookies: string;
    }
     
    export interface Result {
        error: Error;
        $: CheerioHttpcliSelector;
        response: Response;
        body: string;
    }
 
    export interface State {
        queue: number;
        complete: number;
        error: number
    }
     
    export interface Stream extends Stream.Stream {
        url: { href: string } | string;
        type: string;
        length: number;
        toBuffer(error: Error, buffer: Buffer): void;
        end(): void;
    }
     
    export module download {
        export var parallel: number;
        export var state: State;
        export function clearCache(): void;
        export function on(events: string, handler: (stream: Stream) => void): void;
        export function on(events: string, handler: (error: Error) => void): void;
        export function on(events: string, handler: () => void): void;
    }
     
    export var version: string;
    export var headers: {[index: string]: string};
    export var timeout: number;
    export var gzip: boolean;
    export var referer: boolean;
    export var maxDataSize: number;
    export var debug: boolean;
    export function fetch(uri: string, callback: (error: Error, $: CheerioHttpcliSelector, response: Response, body: string) => void): void;
    export function fetch(uri: string, getParam: {[index: string]: string | number}, callback: (error: Error, $: CheerioHttpcliSelector, response: Response, body: string) => void): void;
    export function fetch(uri: string): Promise<Result>;
    export function fetch(uri: string, getParam: {[index: string]: string | number}): Promise<Result>;
    export function fetchSync(uri: string): Result;
    export function fetchSync(uri: string, getParam: {[index: string]: string | number}): Result;
    export function setBrowser(browserType: string): void;
    export function setIconvEngine(iconvModuleName: string): void;
}
