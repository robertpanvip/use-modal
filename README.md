   

@hooks-plus/use-modal
=====================

use-modal

[![NPM Version](https://img.shields.io/npm/v/@hooks-plus/use-modal?color=33cd56&logo=npm)](https://www.npmjs.com/package/@hooks-plus/use-modal)  [![NPM Version](https://img.shields.io/npm/dm/@hooks-plus/use-modal.svg?style=flat-square)](https://www.npmjs.com/package/@hooks-plus/use-modal)  [![unpacked size](https://img.shields.io/npm/unpacked-size/@hooks-plus/use-modal?color=green)](https://www.npmjs.com/package/@hooks-plus/use-modal)  [![Author](https://img.shields.io/badge/docs_by-robertpanvip-blue)](https://github.com/robertpanvip/use-modal.git)

📦 **Installation**
-------------------

    npm install @hooks-plus/use-modal

🏠 Exports
----------

### 

|参数|类型|
|---|---|
|🧷DefaultRender|`Type Aliases`|
|🎗️default|`Functions`|

**🧷Type Aliases**
------------------

  
  

#### DefaultRender

<E\>: `React.ReactNode` | ((extra:E | `undefined`, props:`ModalProps`) => `React.ReactNode`)

**🎗️Functions**
----------------

  
  

#### useModal

*   Modal的一个封装  
      
    
    #### Type Parameters
    
    *   E
    
*   useModal<E\>(defaultRender?:`DefaultRender`<E\>, modalProps?:`ModalProps`): \[`React.ReactElement`, `React.Dispatch`<`React.SetStateAction`<`ModalProps` & {  
      
        state?: E;  
      
    }\>\>, `boolean`\]