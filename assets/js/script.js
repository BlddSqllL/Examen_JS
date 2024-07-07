document.getElementById('buscar').addEventListener('click', async function() {
  try {
      var pesos = document.getElementById('pesos').value;
      var currency = document.getElementById('currency').value;
      var response = await fetch('https://mindicador.cl/api/' + currency);
      var data = await response.json();
      var result = pesos / data.serie[0].valor;
      document.getElementById('result').textContent = result.toFixed(2);

      var lastFiveDaysData = data.serie.slice(-5,).reverse();
      var dates = lastFiveDaysData.map(item => new Date(item.fecha).toLocaleDateString());
      var values = lastFiveDaysData.map(item => item.valor);

      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: dates,
              datasets: [{
                  label: 'Valor de la moneda en los últimos 5 días',
                  data: values,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      min: 850,
                      max: 950
                  }
              }
          }
      });
  } catch (error) {
      console.error('Error:', error);
  }
});

