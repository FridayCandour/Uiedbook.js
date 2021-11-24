declare type BaseE = HTMLElement | NodeListOf<HTMLElement>;
declare type Uied = {
    each(fn: {
        call: (arg0: NodeListOf<HTMLElement>, ind: number) => void;
    }): void;
    style(obj: Partial<HTMLElement["style"]>): BaseE;
    config(obj: Partial<ObjectConstructor>): void;
    appendTo(type: string, attribute: Record<string, string>, number?: number): void;
    on(type: string, callback: (e: Event) => void): void;
    attr(attribute_object: Partial<HTMLElement>): string | null | (string | null)[] | undefined;
    removeAttr(attr: string): void;
    html(code: string): void;
    text(text: string): void;
    addClass(clas: string): void;
    removeClass(clas: string): void;
    hide(): void;
    toggleClass(): void;
    show(): void;
    off(type: string, callback: (e: Event) => void): void;
    box(w: number, h: number, c?: string): void;
    scrollTo(s?: boolean): void;
    add(nod: Element | HTMLElement | Node): void;
    remove(ind: number): void;
    fullScreen(): {
        toggle: () => void;
        set(): void;
        exist(): void;
    };
};
/** the u function is a powerful selector function with added attributes to manipulate dom elements, it does it in a more fast and efficient manner. */
export declare const u: (el: string | BaseE, ifAll_OrNum?: number | boolean | undefined) => Uied;
/** This is for creating css styles using javascipt
 *
 * HOW TO USE
 *
 * css("#container",
{
  *
    height: "100%",
    *
    height: "100%",
    *
    background-color: "#ff9800"
    *
})
*/
export declare const css: (name: string, sel: string | Record<string, string>, properties?: Record<string, string> | undefined) => void;
/** This is for creating css @media styles using javascipt
 *
 * examples.
 *
 * media("min-width: 790px",
 * *
["#container",
{
  *
    width: "100%",
    *
    height: "100%",
    *
    background-color: "#0000"
    *
}]
)
["#header",
{
    width: "100%",
    *
    height: "20%",
    *
    background-color: "#fff"
    *
}]
*
)
 *
*/
export declare const media: (value: string, ...properties: [string, Record<string, string>][]) => void;
/** This is for creating css animations using javascipt
 *
 * example.
 *
 *
 * animate("popanimation",
 *  *
["from",
{
   *
    transform: "scale3D(2)" ,
     *
    height: "10%",
     *
    background-color: "#0000"
     *
}]
 *
)
 *
 *
["to",
{
   *
    transform: "scale3D(1)" ,
     *
    height: "100%",
     *
    background-color: "#ff9800"
     *
}]
)
 *
 *
 *
*/
export declare const animate: (name: string, ...properties: [string, Record<string, string>][]) => void;
declare type lay = [a: string, b?: {
    [k: string]: string;
}, c?: HTMLElement | Node];
/**
 * The build is a context used as a template engine for building layouts
 *
 * example.
 *
 * const p = build(
 * *
  "div",
  {
    *
    title: "title",
    *
    innerText: "am a title",
    *
    onclick: function () {
      *
      console.log("i was clicked");
      *
    }
    *
  },
  *
  build("span", { innerText: "am a span", title: "title" })
  *
);
 */
export declare const build: (...layouts: lay[]) => DocumentFragment | HTMLElement | Element;
declare type bui = Node | HTMLElement;
/**
 * this context used for rendering built layout to a parent or the document body
 *
 * example
 *
 * const p =   build("span", { innerText: "am a span", title: "title" });
 *
buildTo(p, "body");
*/
export declare const buildTo: (child: bui | bui[], parent: string | HTMLElement) => void;
export declare const route: (path: string | undefined, templateId: string, controller: () => void) => HTMLAnchorElement;
/** in construction */
export declare const xhr: <T>(type: string, url: string | URL) => (this: XMLHttpRequest) => T;
/** for checking for empty objects */
export declare const isEmptyObject: (obj: unknown) => obj is Record<string | number | symbol, never>;
export declare const intersect: (target: string, opt: IntersectionObserverInit, callback: IntersectionObserverCallback) => void;
/** `error("there was an error!");` */
export declare const error: (msg: string) => never;
/** the get function is the u function but without any sweet methods it is used if you want to enjoy the easiness of the u function but don't want to use it awesome methods */
export declare const get: <All extends number | boolean | undefined = undefined>(el: string | BaseE, ifAll_OrNum?: All | undefined) => (All extends undefined ? HTMLElement : NodeListOf<HTMLElement>) | null;
/** for getting more purer random number */
export declare const rad: (num: number) => number;
/** it's self explanatory some how */
export declare const create: (type?: string, id?: string) => HTMLElement;
/** an easy to use download function that returns the link element that should be clicked */
export declare const download: (type: string, source: {
    buffer: Uint8Array;
}, name: string) => HTMLAnchorElement;
export declare const debounce: (func: () => void, timeout?: number) => void;
/** the grandmother algorith for managing ids of anything, don't use it if you don't understand it's power it looks simple. */
export declare const keep: (id: string | Record<string, number>, time: number) => true | undefined;
export declare const check: (id: string) => boolean;
export declare const log: (message: unknown) => string[] | undefined;
/** it's self explanatory some how */
export declare const store: (name: string, value: unknown) => void;
export declare const retrieve: (name: string) => string | null;
export declare const remove: (name: string) => void;
export declare const getKey: (index: number) => string | null;
export declare const clear: () => void;
/** for handling even more complicated key events, it's built with the grandmother algorimth or code */
export declare const onKeys: (keys: [], callback: (this: Event) => void, object?: Document, delay?: number, lock?: boolean) => void;
/** under construction!!!!!!! */
export declare const continuesKeys: (keys: string[], callback: (this: Event) => void, delay?: number, object?: Document, lock?: boolean) => void;
export declare const swipe: (item: Record<string, () => void>) => void;
/** this is used for creating pixel stable game views across all screen width with no pixelation problem try and see the magic */
export declare const buildCanvas: (id: string, w?: number, h?: number) => HTMLCanvasElement;
export declare const appendCanvas: (id: string, h: number, w: number, parent: HTMLElement) => HTMLCanvasElement;
/** this is the RE game time line algorimth */
export declare const game: {
    build: (viewID: string) => HTMLDivElement;
    mount: (template: any, callback: () => void) => void;
    start: () => void;
    loadImage: (img: string, id: string) => void;
    loadAudio: (img: string, id: string) => void;
    getImg: (id: string) => HTMLImageElement;
    getAud: (id: string) => HTMLAudioElement;
    cancel: () => void;
    endgame: () => boolean;
};
declare type maker = {
    update: Function;
    paint: Function;
};
/** an entity is any object or thing that can be added to the game world */
export declare class Entity {
    /** this.id = name || "none" //name of the entity for identification can be used out side here */
    name: string;
    /** callback for paint the entity     can be used out side here */
    painter: maker;
    /** this is a callback to add additional properties to the entity at runtime */
    behaviors: Function;
    /** width of entiity */
    width: number;
    /** height of entity */
    height: number;
    /** distance from the top of the canvas */
    top: number;
    /** distance from the left of the canvas */
    left: number;
    /** to check if the entity is displayed */
    visible: boolean;
    /** to delete an entity */
    delete: boolean;
    /** to make the entity observer sides or not */
    border: boolean;
    isHit: boolean;
    constructor(
    /** this.id = name || "none" //name of the entity for identification can be used out side here */
    name: string, 
    /** callback for paint the entity     can be used out side here */
    painter: maker, 
    /** this is a callback to add additional properties to the entity at runtime */
    behaviors: Function);
    update(context: CanvasRenderingContext2D, lastDeltalTime: number): void;
    paint(context: CanvasRenderingContext2D, lastDeltalTime: number): void;
    observeBorder(w: number, h: number): void;
    run(context: CanvasRenderingContext2D, lastDeltalTime: number): void;
}
export declare function ImgPainter(this: any, image: HTMLImageElement, delay?: number): void;
export declare const spriteSheetPainter: (this: any, img: HTMLImageElement, horizontal?: number, vertical?: number, delay?: number) => void;
export {};
