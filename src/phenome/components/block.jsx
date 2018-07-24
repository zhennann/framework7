import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-block',
  props: {
    id: [String, Number],
    inset: Boolean,
    tabletInset: Boolean,
    strong: Boolean,
    tabs: Boolean,
    tab: Boolean,
    tabActive: Boolean,
    accordionList: Boolean,
    noHairlines: Boolean,
    noHairlinesMd: Boolean,
    noHairlinesIos: Boolean,
    ...Mixins.colorProps,
  },
  componentDidMount() {
    const el = this.el;
    if (!el) return;
    this.onTabShowBound = this.onTabShow.bind(this);
    this.onTabHideBound = this.onTabHide.bind(this);
    el.addEventListener('tab:show', this.onTabShowBound);
    el.addEventListener('tab:hide', this.onTabHideBound);
  },
  componentWillUnmount() {
    const el = this.el;
    if (!el) return;
    el.removeEventListener('tab:show', this.onTabShowBound);
    el.removeEventListener('tab:hide', this.onTabHideBound);
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      inset,
      strong,
      accordionList,
      tabletInset,
      tabs,
      tab,
      tabActive,
      noHairlines,
      noHairlinesIos,
      noHairlinesMd,
      id,
      style,
    } = props;
    const classes = Utils.classNames(
      className,
      'block',
      {
        inset,
        'block-strong': strong,
        'accordion-list': accordionList,
        'tablet-inset': tabletInset,
        tabs,
        tab,
        'tab-active': tabActive,
        'no-hairlines': noHairlines,
        'no-hairlines-md': noHairlinesMd,
        'no-hairlines-ios': noHairlinesIos,
      },
      Mixins.colorClasses(props),
    );
    return (
      <div
        id={id}
        style={style}
        className={classes}
      >
        <slot />
      </div>
    );
  },
  methods: {
    onTabShow(e) {
      this.dispatchEvent('tabShow tab:show', e);
    },
    onTabHide(e) {
      this.dispatchEvent('tabShow tab:hide', e);
    },
  },
};
