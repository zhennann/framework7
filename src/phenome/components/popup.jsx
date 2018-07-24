import Mixins from '../utils/mixins';
import Utils from '../utils/utils';

export default {
  name: 'f7-popup',
  props: {
    id: [String, Number],
    tabletFullscreen: Boolean,
    opened: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      tabletFullscreen,
    } = props;

    const classes = Utils.classNames(
      className,
      'popup',
      {
        'popup-tablet-fullscreen': tabletFullscreen,
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
        <slot />
      </div>
    );
  },
  watch: {
    'props.opened': function watchOpened(opened) {
      const self = this;
      if (!self.f7Popup) return;
      if (opened) {
        self.f7Popup.open();
      } else {
        self.f7Popup.close();
      }
    },
  },

  componentDidMount() {
    const self = this;

    const el = self.refs.el;
    if (!el) return;
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
    el.addEventListener('popup:open', self.onOpenBound);
    el.addEventListener('popup:opened', self.onOpenedBound);
    el.addEventListener('popup:close', self.onCloseBound);
    el.addEventListener('popup:closed', self.onClosedBound);

    self.$f7ready(() => {
      self.f7Popup = self.$f7.popup.create({
        el,
      });
      if (self.props.opened) {
        self.f7Popup.open(false);
      }
    });
  },
  componentWillUnmount() {
    const self = this;
    if (self.f7Popup) self.f7Popup.destroy();
    const el = self.refs.el;
    if (!el) return;
    el.removeEventListener('popup:open', self.onOpenBound);
    el.removeEventListener('popup:opened', self.onOpenedBound);
    el.removeEventListener('popup:close', self.onCloseBound);
    el.removeEventListener('popup:closed', self.onClosedBound);
  },
  methods: {
    onOpen(event) {
      this.dispatchEvent('popup:open popupOpen', event);
    },
    onOpened(event) {
      this.dispatchEvent('popup:opened popupOpened', event);
    },
    onClose(event) {
      this.dispatchEvent('popup:close popupClose', event);
    },
    onClosed(event) {
      this.dispatchEvent('popup:closed popupClosed', event);
    },
    open(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.popup.open(self.refs.el, animate);
    },
    close(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.popup.close(self.refs.el, animate);
    },
  },
};
