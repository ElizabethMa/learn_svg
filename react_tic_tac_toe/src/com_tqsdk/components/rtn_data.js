import { useEffect, useRef } from "react";
import { tqsdk } from "../data/tqsdkActions";
export function useTQSDK() {
  // 初始值
  let refresh = () => {};

  // 定义rtn_data刷新时组件的刷新函数
  const setRtnDataEvent = newRefresh => refresh = newRefresh
  
  // 刷新动作，去掉这一步会导致refresh函数始终执行初始值
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rtnDataEvent = () => refresh();

  useEffect(() => {
    tqsdk.on('rtn_data', rtnDataEvent)  // 组件加载时调用useEffect增加刷新事件
    return () => tqsdk.off('rtn_data', rtnDataEvent) // 组件卸载时注销tqsdk事件
  }, [rtnDataEvent])

  return {
    setRtnDataEvent,
  };
}
