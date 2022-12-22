let totalCharts = TradingViewApi.chartsCount();

for (let i = 0; i < totalCharts; i++) {
  TradingViewApi.chart(i).crossHairMoved().subscribe({}, onCrossChange);
}

function onCrossChange(e) {
  let price = e.price;
  if (typeof price === 'number' && !Number.isNaN(e.price)) {
    window.postMessage({
      type: '__crosshair_price',
      price,
    });
  }
}
