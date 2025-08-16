import { useRef } from 'react';
import usePerformance from './hooks/usePerformance';
import ReactECharts from 'echarts-for-react';

function App() {
  const { fps, memory, domNodes, isCrashing } = usePerformance();
  const chartRef = useRef(null);
  
  // 图表配置
  const chartOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['FPS', '内存占用(MB)', 'DOM节点数']
    },
    xAxis: {
      type: 'category',
      data: ['当前值']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'FPS',
        type: 'bar',
        data: [fps],
        itemStyle: {
          color: fps > 50 ? '#36a35f' : fps > 30 ? '#e8c35a' : '#c23531'
        }
      },
      {
        name: '内存占用(MB)',
        type: 'bar',
        data: [memory]
      },
      {
        name: 'DOM节点数',
        type: 'bar',
        data: [domNodes]
      }
    ]
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>React性能监控仪表盘</h1>
      
      {isCrashing && (
        <div style={{
          background: '#c23531',
          color: 'white',
          padding: 10,
          borderRadius: 4,
          marginBottom: 20,
          textAlign: 'center'
        }}>
          ⚠️ 性能崩溃警告！FPS低于25或内存超过500MB
        </div>
      )}
      
      <ReactECharts 
        ref={chartRef} 
        option={chartOption} 
        style={{ height: 400 }} 
      />
      
      <div style={{ marginTop: 20 }}>
        <h3>实时数据：</h3>
        <ul>
          <li>FPS: <strong>{fps}</strong> {fps > 60 ? '🚀' : fps < 30 ? '🐢' : '🚶'}</li>
          <li>内存占用: <strong>{memory} MB</strong></li>
          <li>DOM节点数: <strong>{domNodes}</strong></li>
        </ul>
      </div>
    </div>
  );
}

export default App;