import * as React from "react"
import {useState, useCallback} from "react"
import {Modal} from "antd"
import type {ModalProps} from "antd"

const useModal: (jsx: React.ReactNode, defaultModalProps?: ModalProps) => [React.ReactElement, React.Dispatch<React.SetStateAction<ModalProps>>] = (jsx, defaultModalProps) => {
    const [props, setProps] = useState<ModalProps>({...defaultModalProps})

    const updateModalProps = useCallback((props: React.SetStateAction<ModalProps>) => {
        setProps((prev) => ({...prev, ...props}))
    }, [])

    const handleProxyCancel = useCallback((e: React.MouseEvent<HTMLElement>) => {
        props.onCancel?.(e)
        updateModalProps({visible: false});
    }, [props.onCancel])

    const handleProxyOk = useCallback(async (e: React.MouseEvent<HTMLElement>) => {
        updateModalProps({confirmLoading: true});
        let final;
        try {
            await props.onOk?.(e);
            final = {visible: false, confirmLoading: false}
        } catch (e) {
            final = {confirmLoading: false}
        }
        updateModalProps(final)
    }, [props.onOk])

    const modal = (
        <Modal
            {...props}
            onCancel={handleProxyCancel}
            onOk={handleProxyOk}
        >
            {jsx}
        </Modal>
    )
    return [modal, updateModalProps]
}
export default useModal