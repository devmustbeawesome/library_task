<template>
    <div class="input-wrapper">
        <input
            v-if="type !== 'textarea'"
            ref="input"
            :type="newType"
            :maxlength="maxlength"
            :value="computedValue"
            @input="onInput"
            @change="onChange"
            @blur="onBlur"
            @focus="onFocus"
        />
        <textarea
            v-else
            ref="textarea"
            :maxlength="maxlength"
            :value="newType"
            @input="onInput"
            @change="onChange"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: { type: String, required: true, default: '' },
    type: { type: String, required: false, default: 'text' },
    maxlength: {},
})
const emit = defineEmits(['update:modelValue'])
const newValue = ref(props.modelValue)
const computedValue = computed({
    get: () => newValue.value,
    set: (value) => {
        newValue.value = value
        emit('update:modelValue', value)
    },
})
const newType = ref(props.type)

watch(
    () => props.modelValue,
    (value) => {
        newValue.value = value
    }
)
// watch(() => newValue, (value) => {
//     emit('update:modelValue', value)
// })
watch(
    () => props.type,
    (value) => {
        newType.value = value
    }
)

function onInput(event) {
    // if (!this.lazy) {
    updateValue(event.target.value)
    // }
}
function onChange(event) {
    // if (this.lazy) {
    updateValue(event.target.value)
    // }
}
function updateValue(value) {
    computedValue.value = value
    // !this.isValid && this.checkHtml5Validity()
}
</script>
