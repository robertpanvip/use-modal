import * as React from "react";
import useModal from "../../src"

export default function App() {
    const [template, updateModalProps] = useModal(<div>123</div>,{
        title: "模态框",
        onOk(){
            console.log("ok----")
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    reject(true);
                },2050)
            })
        }
    })
    return (
        <div>
            {template}
            <button onClick={() => updateModalProps({open: true,title: "模态框2"})}>打开模态框</button>
        </div>
    )
}