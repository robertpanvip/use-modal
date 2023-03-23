import * as React from "react";
import "antd/dist/antd.css"
import useModal from "../../src"

export default function App() {
    const [template, updateModalProps] = useModal(<div>123</div>,{
        title: "模态框",
        onOk(){
            console.log("ok----")
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    reject(true);
                },150)
            })
        }
    })
    return (
        <div>
            {template}
            <button onClick={() => updateModalProps({visible: true,title: "模态框2"})}>打开模态框</button>
        </div>
    )
}