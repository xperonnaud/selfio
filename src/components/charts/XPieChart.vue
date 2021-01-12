
<script>

  import { Pie } from "vue-chartjs";

  export default {
    extends: Pie,
    props: {
      labels: Array,
      datasets: Array,
    },
    async mounted() {
      await this.renderChart(
        {
          labels: this.labels,
          datasets: this.datasets
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          }
        }
      );
    }
  }

</script>
