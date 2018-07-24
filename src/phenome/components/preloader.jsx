import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-preloader',
  props: {
    id: [String, Number],
    size: [Number, String],
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const { sizeComputed } = self;
    const props = self.props;
    const { id, style, className } = props;

    const preloaderStyle = {};
    if (sizeComputed) {
      preloaderStyle.width = `${sizeComputed}px`;
      preloaderStyle.height = `${sizeComputed}px`;
    }
    if (style) Utils.extend(preloaderStyle, style || {});

    let innerEl;
    if (self.$theme.md) {
      innerEl = (
        <span className="preloader-inner">
          <span className="preloader-inner-gap" />
          <span className="preloader-inner-left">
            <span className="preloader-inner-half-circle" />
          </span>
          <span className="preloader-inner-right">
            <span className="preloader-inner-half-circle" />
          </span>
        </span>
      );
    }

    const classes = Utils.classNames(
      className,
      'preloader',
      Mixins.colorClasses(props),
    );
    return (
      <span id={id} style={preloaderStyle} className={classes}>
        {innerEl}
      </span>
    );
  },
  computed: {
    sizeComputed() {
      let s = this.props.size;
      if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
        s = s.replace('px', '');
      }
      return s;
    },
  },
};
