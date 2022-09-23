<template>
  <div class="form-item input-text" :class="classes">
    <label class="input-text__label">
      <span v-if="label" class="input-text__label__txt">
        {{ label }}
      </span>

      <input
        v-model="input"
        :id="id"
        :type="type"
        :name="name"
        :inputmode="type === 'number' ? 'numeric' : type"
        :disabled="isDisabled"
        :readonly="isReadonly"
        :placeholder="placeholder"
        :autocomplete="isAutocomplete ? 'on' : 'off'"
        class="form-input input-text__input"
        @change="$emit('change', $event)"
        @input="$emit('input', $event)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        @keyup="$emit('keyup', $event)"
        @keydown="$emit('keydown', $event)"
      />
    </label>

    <transition>
      <div v-if="$slots.default" class="form-error">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import { computed, useSlots } from 'vue';

export default {
  name: 'InputText',
  props: {
    modelValue: {
      type: [String, Number],
    },
    type: {
      type: String,
      default: 'text',
      validator(prop) {
        return [
          'url',
          'tel',
          'text',
          'email',
          'search',
          'number',
          'decimal',
          'password',
        ].includes(prop);
      },
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
      validator(prop) {
        return !!prop;
      },
    },
    id: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    isAutocomplete: {
      type: Boolean,
      default: true,
    },
    isHasError: {
      type: Boolean,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const slots = useSlots();

    const input = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value);
      },
    });

    const classes = computed(() => {
      return {
        'form-item--error': props.isHasError,
      };
    });

    return {
      input,
      classes,
    };
  },
};
</script>
