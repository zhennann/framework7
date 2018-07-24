import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-range',
  props: {
    id: [String, Number],
    init: {
      type: Boolean,
      default: true,
    },
    value: {
      type: [Number, Array, String],
      default: 0,
    },
    min: {
      type: [Number, String],
      default: 0,
    },
    max: {
      type: [Number, String],
      default: 100,
    },
    step: {
      type: [Number, String],
      default: 1,
    },
    label: {
      type: Boolean,
      default: false,
    },
    dual: {
      type: Boolean,
      default: false,
    },
    name: String,
    inputId: String,
    input: Boolean,
    disabled: Boolean,
    draggableBar: {
      type: Boolean,
      default: true,
    },
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      disabled,
      className,
      style,
      input,
      inputId,
      name,
    } = self.props;

    const classes = Utils.classNames(
      className,
      'range-slider',
      {
        disabled,
      },
      Mixins.colorClasses(props),
    );

    return (
      <div
        ref="el"
        id={id}
        style={style}
        className={classes}
      >
        {input && (
          <input type="range" name={name} id={inputId} />
        )}
        <slot />
      </div>
    );
  },
  watch: {
    'props.value': function watchValue(newValue) {
      const self = this;
      if (!self.f7Range) return;
      self.f7Range.setValue(newValue);
    },
  },
  componentDidMount() {
    const self = this;
    self.$f7ready((f7) => {
      if (!self.props.init) return;
      const props = self.props;
      const {
        value,
        min,
        max,
        step,
        label,
        dual,
        draggableBar,
      } = props;
      self.f7Range = f7.range.create(Utils.noUndefinedProps({
        el: self.refs.el,
        value,
        min,
        max,
        step,
        label,
        dual,
        draggableBar,
        on: {
          change(range, val) {
            self.dispatchEvent('range:change rangeChange', val);
          },
          changed(range, val) {
            self.dispatchEvent('range:changed rangeChanged', val);
          },
        },
      }));
    });
  },
  componentWillUnmount() {
    const self = this;
    if (self.f7Range && self.f7Range.destroy) self.f7Range.destroy();
  },
  methods: {
    setValue(newValue) {
      const self = this;
      if (self.f7Range && self.f7Range.setValue) self.f7Range.setValue(newValue);
    },
    getValue() {
      const self = this;
      if (self.f7Range && self.f7Range.getValue) {
        return self.f7Range.getValue();
      }
      return undefined;
    },
  },
};
