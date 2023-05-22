<template>
    <div class="container">
      <img :src="attraction.firstImage" alt="">
      <div class="detail-header">
        <span>{{ attraction.title }}</span>
        <button @click="showAddLocationModal">일정추가</button>
      </div>
      <div class="address-section" >{{ attraction.addr1 }}</div>
      <div class="description-section">{{ attraction.overview }}</div>
      <add-location-modal v-if="openAddLocationModal" :contentId="attraction.contentId" @closeAddLocationModal="closeAddLocationModal" @showAddPlanModal="showAddPlanModal"></add-location-modal>
      <add-plan-modal v-if="openAddPlanModal" @closeAddPlanModal="closeAddPlanModal"></add-plan-modal>
    </div>
</template>

<script>
import AddLocationModal from "@/components/Plan/AddLocationModal.vue";
import AddPlanModal from "@/components/Plan/AddPlanModal.vue";
import { getAttractionDetail } from "@/api/attraction.js";

export default {
  components: {
    AddLocationModal,
    AddPlanModal,
  },
  data() {
    return {
      attraction: null,
      openAddLocationModal: false,
      openAddPlanModal: false,
    }
  },
  created() {
    const contentId = this.$route.params.contentId;

    getAttractionDetail(contentId, ({ data }) => {
      this.attraction = data;
      console.log(this.attraction);
    },
    (error) => console.log(error)
    )
  },
  methods: {
    showAddLocationModal() {
        this.openAddLocationModal = true;
    },
    closeAddLocationModal() {
        this.openAddLocationModal = false;
    },
    showAddPlanModal() {
        this.closeAddLocationModal();
        this.openAddPlanModal = true;
    },
    closeAddPlanModal() {
        this.openAddPlanModal = false;
        this.showAddLocationModal();
    }, 
  }
}
</script>

<style scoped>
  .container {
    width: 560px;
    margin: 40px auto;
  }

  .container img {
    object-fit: cover;
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 10px;
  }

  .detail-header {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    padding-bottom: 40px;
    border-bottom: 2px solid rgb(219, 219, 219);
  }

  .detail-header span {
    font-size: 30px;
    font-weight: 700;
  }

  .detail-header button {
    background: linear-gradient(to right, #e61e4d 0%, #e31c5f 50%, #d70466 100%);
    border: 0;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    width: 150px;
  }

  .address-section {
    font-weight: 600;
    padding-top: 40px;
    padding-bottom: 40px;
    border-bottom: 2px solid rgb(219, 219, 219);
  }

  .description-section {
    margin-top: 40px;
    padding-bottom: 40px;
    border-bottom: 2px solid rgb(219, 219, 219);

  }


</style>