<template>
    <MyTooltip :triggers="['click']" v-model:active="show_select" :always_active="false">
        <template v-slot:label>
            <div class="selectValue">{{ label }}</div>
        </template>
        <template v-slot:content>
            <div v-for="(value, index) in list" :key="index" @click="selected = value.id; label = value.name;">
                <slot :value1="value"></slot>
            </div>
        </template>
    </MyTooltip>
</template>

<script setup>


const props = defineProps(['list', 'modelValue', 'classList'])
const emit = defineEmits(['update:modelValue'])
var selected = ref(props.modelValue);
var label = ref("");
var show_select = ref(false);
watch(selected, (selected) => {
    emit('update:modelValue', selected)
})
onMounted(() => updateList(props.list, selected.value))

watch(props.list, (list) => updateList(list, selected.value))

watch(() => props.modelValue, (newValue) => updateList(props.list, newValue))

const updateList = (list = [], selected = undefined) => {

    label.value = list.find((el) => el.id == selected)?.name ?? "test"
}

const vOutside = {
    mounted: (el, binding) => {
        el.clickOutsideEvent = (event) => {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event);
            }
        };
        document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted: (el) => {
        document.removeEventListener('click', el.clickOutsideEvent);
    },
}
</script>
<style>
.slectList {
    display: block;
    position: absolute;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    background: inherit;
}

.mySelect {
    border: 1px solid black;
    border-radius: 3px;
    cursor: pointer;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    background: #ffffff;
}

.selectValue {
    padding: 3px;
}
</style>