import { useRequest } from "ahooks";
import React, { useState, useCallback } from "react";
import { Modal } from "antd";
import type { ModalProps } from "antd";
import { pxToRem } from "@/utils/rem";

export type DefaultRender<E> =
  | React.ReactNode
  | ((extra: E | undefined, props: ModalProps) => React.ReactNode);

/**
 * Modal的一个封装
 * @param defaultRender 将要放在modal中的组件 如果想要使用Form 注意按照antd的规范 Form表单的preserve={false}
 * @param modalProps 模态框属性值
 * @return [context, updateProps] context 模态框的ast updateProps 更新模态框属性的方法
 * 如果想要再onOk的时候不关闭模态框 只需要抛出一个错误既可 throw new Error();
 */
function useModal<E>(
  defaultRender?: DefaultRender<E>,
  modalProps: ModalProps = {}
): [
  React.ReactElement,
  React.Dispatch<React.SetStateAction<ModalProps & { state?: E }>>,
  boolean
] {
  const [open, setOpen] = useState<boolean>(false);
  const [props, setProps] = useState<ModalProps & { state?: E }>({});

  const mergedProps = { ...modalProps, ...props };
  const { runAsync: okService, loading } = useRequest(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      await mergedProps.onOk?.(e);
    },
    {
      throttleWait: 800,
      throttleLeading: false,
      throttleTrailing: true,
      manual: true,
    }
  );
  const onProxyCancel = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    await mergedProps.onCancel?.(e);
    setOpen(false);
  };
  const onProxyOk = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    await okService?.(e);
    setOpen(false);
  };
  const { state, ...rest } = mergedProps;

  const context = (
    <Modal
      maskClosable={false}
      destroyOnClose
      {...rest}
      confirmLoading={loading || mergedProps.confirmLoading}
      open={open}
      width={pxToRem(mergedProps.width || 520)}
      onCancel={onProxyCancel}
      onOk={onProxyOk}
    >
      {mergedProps.children ||
        (defaultRender &&
          (typeof defaultRender === "function"
            ? defaultRender(state, mergedProps)
            : defaultRender))}
    </Modal>
  );
  const updateProps = useCallback(
    (props: React.SetStateAction<ModalProps>) => {
      if (typeof props == "function") {
        setProps((prevState) => {
          const _props = props(prevState);
          setOpen(!!_props.open);
          return { ..._props };
        });
      } else {
        setOpen(!!props.open);
        setProps({ ...props });
      }
    },
    [setProps, setOpen]
  );
  return [context, updateProps, open] as const;
}

export default useModal;
