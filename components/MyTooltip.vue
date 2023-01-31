<template>
    <div class="tooltip" @focus="show" @mouseenter="show"
        @blur="hide" @mouseleave="hide" v-outside="hide">
        <div class="label">
            <slot name="label"/>
        </div>
        <div class="tooltip-content" v-show="tooltipShow">
            <slot name="content"/>
            <i class="hideIcon" @click="hide">☦</i>
        </div>
    </div>
</template>

<script setup>

    const props = defineProps([])
    const emit = defineEmits([])
    const tooltipShow = ref(false)

    const vOutside = {
        mounted: (el,binding) => {
            el.clickOutsideEvent = (event) => {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event);
            }
            };
            document.addEventListener('click', el.clickOutsideEvent);
        },
        unmounted: (el)=>{
            document.removeEventListener('click', el.clickOutsideEvent);
        },
    }
    function show(){
        tooltipShow.value = true
    }
    function hide(){
        tooltipShow.value = false
    }
    function toggle(){
        tooltipShow.value = !tooltipShow.value
    }
   
</script>

<style>
.tooltip{
    position: relative;
    background: #ffffff;
}
.tooltip-content{
    padding: 5px;
    padding-right: 12px;
    border: 1px solid black;
    position: absolute;
    background: inherit;
}
.hideIcon{
    position: absolute;
    right: 3px;
    top: 3px;
    cursor: pointer;
}
    
</style>