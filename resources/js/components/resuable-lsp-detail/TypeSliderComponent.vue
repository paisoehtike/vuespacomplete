<template>
    <swiper class="swiper" :options="swiperOption">
        <swiper-slide
        @click.native="typeOnClick(typer)"
        :class="{onClick:selected == typer.id}" 
        v-for="(typer, index) in type" 
        :key="index">
            {{ typer.name }}
        </swiper-slide>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
    props: [
        'type', 'defaultId'
    ],
    name: 'swiper-example-free-mode',
    title: 'Free mode / No fixed positions',
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            selected: null,
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 18,
                freeMode: true,
            },
        }
    },
    methods: {
        typeOnClick(typer) {
            if (this.selected == typer.id) {
                this.selected = null;
                this.$emit('type-id', null);
            } else {
                this.selected = typer.id;
                this.$emit('type-id', typer.id);
            }
        }
    },
    watch: {
        defaultId: function(val) {
            this.selected = val;
        }
    },
    mounted() {
        if(defaultId) {
            this.selected = defaultId;
        }
    }
}
</script>