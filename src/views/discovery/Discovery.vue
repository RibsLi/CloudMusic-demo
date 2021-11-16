<template>
  <div class="discovery">
    <banners :banners="banners"/>
    <recommend :recommends="recommends" />
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
    </ul>
  </div>
</template>

<script>
import { getBanners, getRecommend } from "network/discovery";
import Banners from "./children/Banners"
import Recommend from "./children/Recommend";

export default {
  name: "Discovery",
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  components: {
    Banners,
    Recommend,
  },
  created() {
    getBanners().then((res) => {
      // console.log(res);
      this.banners = res.data.banners;
    });
    getRecommend("16").then((res) => {
      console.log(res);
      this.recommends = res.data.result;
    });
  },
};
</script>

<style scoped>

</style>