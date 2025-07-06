# TrendChart组件中伪元素虚线与echarts数据联动机制分析

在该TrendChart组件中，伪元素虚线与echarts图表实现了精巧的联动效果，形成垂直指示线来帮助用户准确定位数据。整个联动机制包含以下几个关键部分：

## 1. CSS实现垂直指示线

```css
.trend-chart-main {
   position: relative;

   &::before {
      content: "";
      position: absolute;
      top: -80px; /* 向上延伸覆盖任务创建区域 */
      height: calc(100% + 45px); /* 总高度包括上下延伸 */
      width: 2px;
      border-left: 2px dashed #e0e6f1;
      opacity: 0; /* 默认隐藏 */
      pointer-events: none; /* 避免干扰鼠标事件 */
      z-index: 1;
   }
}

/* 显示指示器时样式 */
.trend-chart-main.show-indicator::before {
   opacity: 1;
   left: var(--indicator-position);
}

/* 全局CSS变量 */
:root {
   --indicator-position: 0px;
}
```

这里使用伪元素`::before`创建虚线，默认隐藏状态，当添加`show-indicator`类时显示，位置由`--indicator-position`变量控制。

## 2. JavaScript与echarts交互

核心代码在`setupIndicatorExtension`函数中：

```javascript
function setupIndicatorExtension() {
   if (!chartInstance || !chartContainer.value) return;

   chartInstance.getZr().on("mousemove", event => {
      const containerEl = chartContainer.value as HTMLElement | null;
      if (!containerEl) return;

      // 将鼠标坐标转换为逻辑坐标
      const pointInPixel = [event.offsetX, event.offsetY];
      const isInAxis = chartInstance?.containPixel("grid", pointInPixel);

      if (isInAxis) {
         // 鼠标在坐标轴内，显示指示器
         document.documentElement.style.setProperty("--indicator-position", `${event.offsetX}px`);
         containerEl.classList.add("show-indicator");
      } else {
         // 鼠标不在坐标轴内，隐藏指示器
         containerEl.classList.remove("show-indicator");
      }
   });

   // 鼠标移出事件
   chartInstance.getZr().on("mouseout", () => {
      const containerEl = chartContainer.value as HTMLElement | null;
      if (containerEl) {
         containerEl.classList.remove("show-indicator");
      }
   });
}
```

## 3. 联动工作流程

1. **事件捕获**：
   - 通过`chartInstance.getZr().on("mousemove", ...)`监听echarts中的鼠标移动
   - `getZr()`获取echarts底层ZRender渲染器实例

2. **区域判断**：
   - 使用`containPixel("grid", pointInPixel)`判断鼠标是否在图表绘图区域内
   - 只有鼠标在绘图区域内才激活指示器

3. **CSS变量更新**：
   - 当鼠标在绘图区内时，通过`document.documentElement.style.setProperty`更新CSS变量
   - 将`--indicator-position`设置为当前鼠标X坐标(`event.offsetX`)

4. **控制指示器显隐**：
   - 在合适区域内添加`containerEl.classList.add("show-indicator")`显示指示器
   - 鼠标离开区域时移除类名隐藏指示器

5. **贯穿布局联动**：
   - 伪元素垂直线通过CSS设置延伸到任务节点区域
   - 利用`top: -80px`和`height: calc(100% + 45px)`确保虚线覆盖整个图表和任务点区域