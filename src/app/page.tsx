// import { cookieStorage, createStorage, http } from '@wagmi/core'
import { ConnectButton } from "@/components/ConnectButton";

export default function Home() {

  return (
    <div className={"pages"}>
      {/* 右上角连接按钮 */}
      <div className="connect-button-container">
        <ConnectButton />
      </div>

      {/* 主要内容区域 */}
      <div className="main-content">
        {/* 这里可以放置其他内容 */}
      </div>
    </div>
  );
}