'use client'

import { useAppKit, useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react'
import { useState, useEffect, useRef } from 'react'

export const ConnectButton = () => {
  const { open, close } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const { chainId, caipNetwork } = useAppKitNetwork()
  const [isHovered, setIsHovered] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const previousChainId = useRef(chainId)

  const handleClick = () => {
    console.log('ConnectButton clicked, isConnected:', isConnected)
    console.log('AppKit open function:', typeof open, open)
    try {
      if (!isConnected) {
        console.log('Opening AppKit modal...')
        setIsConnecting(true)
        open()
      } else {
        console.log('Already connected, opening account modal...')
        open()
      }
    } catch (error) {
      console.error('Error opening AppKit:', error)
      setIsConnecting(false)
    }
  }

  // 监听网络切换，当chainId变化时自动关闭弹窗
  useEffect(() => {
    if (previousChainId.current !== undefined && previousChainId.current !== chainId && chainId !== undefined) {
      console.log('Network changed from', previousChainId.current, 'to', chainId)
      // 网络切换成功后自动关闭弹窗，增加延迟确保UI状态稳定
      setTimeout(() => {
        close()
      }, 1000) // 延迟1000ms关闭，确保网络切换完全完成且UI状态稳定
    }
    previousChainId.current = chainId
  }, [chainId, close])

  // 监听连接状态变化，连接成功后停止loading
  useEffect(() => {
    if (isConnected && isConnecting) {
      setIsConnecting(false)
    }
  }, [isConnected, isConnecting])

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const buttonStyle = {
    padding: isConnected ? '16px 20px' : '12px 24px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: isConnected 
      ? (isHovered ? '#f8f9fa' : '#ffffff')
      : (isHovered ? '#1f2937' : '#000000'),
    color: isConnected ? '#000000' : '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: '140px',
    minHeight: '48px',
    justifyContent: 'center',
    position: 'relative' as const
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
      <div
        onClick={handleClick}
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isConnecting ? (
          <>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid transparent',
              borderTop: `2px solid ${isConnected ? '#000000' : '#ffffff'}`,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            连接中...
          </>
        ) : isConnected ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#10b981',
              borderRadius: '50%'
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>{formatAddress(address!)}</span>
              <span style={{ fontSize: '12px', opacity: '0.7', fontWeight: '400' }}>{caipNetwork?.name || 'Unknown Network'}</span>
            </div>
          </div>
        ) : (
          '连接钱包'
        )}
      </div>
      

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
