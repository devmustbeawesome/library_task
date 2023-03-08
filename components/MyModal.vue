<template>
    <div v-show="active">
        <div class="modal-background" @click="active = false"></div>
        <div class="modal">
            <div class="modal-header">
                <slot name="header" />
                <div
                    v-if="ableClose"
                    class="close-icon"
                    @click="active = false"
                >
                    ╳
                </div>
            </div>
            <div class="modal-content">
                <slot name="content" />
            </div>
            <div class="modal-footer">
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    active: { type: Boolean, required: false, default: false },
    ableClose: { type: Boolean, required: false, default: true },
})
const emit = defineEmits(['update:active'])

const active = ref(props.active)
watch(active, (value) => emit('update:active', value))
watch(
    () => props.active,
    (value) => (active.value = value)
)

onBeforeMount(() => {
    if (typeof window !== 'undefined') {
        document.addEventListener('keyup', keyPress)
    }
})
onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
        document.removeEventListener('keyup', keyPress)
    }
})
function keyPress({ key }) {
    if (active.value && (key === 'Escape' || key === 'Esc'))
        active.value = false
}
</script>

<style>
.modal-background {
    width: 100vw;
    height: 100vh;
    background-color: #0000007e;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
}

.modal {
    padding: 10px;
    border: 1px solid black;
    background-color: #ffffff;
    position: absolute;
    border-radius: 10px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: fit-content;
    width: fit-content;
}

.modal-header {
    display: flex;
}

.hide-icon {
    position: absolute;
    right: 3px;
    top: 3px;
    cursor: pointer;
}
</style>
