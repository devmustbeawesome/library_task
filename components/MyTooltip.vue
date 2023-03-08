<template>
    <div
        class="tooltip"
        @focus="triggers.includes('focus') && show()"
        @mouseenter="triggers.includes('hover') && show()"
        @blur="triggers.includes('focus') && hide()"
        @mouseleave="triggers.includes('hover') && hide()"
    >
        <div
            v-outside="() => triggers.includes('click') && hide()"
            class="label"
            @click="triggers.includes('click') && show()"
        >
            <slot name="label" />
        </div>
        <div v-show="tooltipShow || always_active" class="tooltip-content">
            <slot name="content" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    triggers: { type: Array, required: false, default: () => ['hover'] },
    active: { type: Boolean, required: false, default: false },
    always_active: { type: Boolean, required: false, default: false },
})
const emit = defineEmits(['update:active'])

const tooltipShow = ref(props.active)
watch(tooltipShow, (value) => emit('update:active', value))
watch(
    () => props.active,
    (value) => (tooltipShow.value = value)
)
const vOutside = {
    mounted: (el, binding) => {
        el.clickOutsideEvent = (event) => {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event)
            }
        }
        document.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted: (el) => {
        document.removeEventListener('click', el.clickOutsideEvent)
    },
}
function show() {
    tooltipShow.value = true
}
function hide() {
    tooltipShow.value = false
}
</script>

<style>
.tooltip {
    position: relative;
    background: #ffffff;
}

.tooltip-content {
    padding: 5px;
    padding-right: 12px;
    border: 1px solid black;
    position: absolute;
    background: inherit;
    z-index: 2;
}

.hide-icon {
    position: absolute;
    right: 3px;
    top: 3px;
    cursor: pointer;
}
</style>
