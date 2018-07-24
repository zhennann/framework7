/* eslint array-callback-return: "off" */
/* eslint consistent-return: "off" */
import events from '../utils/events';
import f7 from '../utils/f7';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-tab',
  props: {
    id: [String, Number],
    tabActive: Boolean,
    ...Mixins.colorProps,
  },
  state() {
    return {
      tabContent: null,
    };
  },
  render() {
    const self = this;
    const props = self.props;
    const { tabActive, id, className, style } = props;
    const tabContent = self.state.tabContent;

    const classes = Utils.classNames(
      className,
      'tab',
      {
        'tab-active': tabActive,
      },
      Mixins.colorClasses(props),
    );

    let TabContent;
    if (tabContent) TabContent = tabContent.component;
    if (process.env.COMPILER === 'react') {
      return (
        <div id={id} style={style} ref="el" className={classes}>
          {tabContent ? (
            <TabContent key={tabContent.id} {...tabContent.props} />
          ) : (
            <slot />
          )}
        </div>
      );
    }
    if (process.env.COMPILER === 'vue') {
      return (
        <div id={id} style={style} ref="el" className={classes}>
          {tabContent ? (
            <TabContent key={tabContent.id} props={tabContent.props} />
          ) : (
            <slot />
          )}
        </div>
      );
    }
  },
  componentDidCreate() {
    this.onTabShowBound = this.onTabShow.bind(this);
    this.onTabHideBound = this.onTabHide.bind(this);
  },
  componentDidUpdate() {
    const self = this;
    if (!self.routerData) return;
    events.emit('tabRouterDidUpdate', self.routerData);
  },
  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    if (el) {
      el.removeEventListener('tab:show', self.onTabShowBound);
      el.removeEventListener('tab:hide', self.onTabHideBound);
    }
    if (!self.routerData) return;
    f7.routers.tabs.splice(f7.routers.tabs.indexOf(self.routerData), 1);
    self.routerData = null;
    delete self.routerData;
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;

    if (el) {
      el.addEventListener('tab:show', self.onTabShowBound);
      el.addEventListener('tab:hide', self.onTabHideBound);
    }
    self.setState({ tabContent: null });

    self.$f7ready(() => {
      self.routerData = {
        el,
        component: self,
      };
      f7.routers.tabs.push(self.routerData);
    });
  },
  methods: {
    show(animate) {
      if (!this.$f7) return;
      this.$f7.tab.show(this.refs.el, animate);
    },
    onTabShow(e) {
      this.dispatchEvent('tab:show tabShow', e);
    },
    onTabHide(e) {
      this.dispatchEvent('tab:hide tabHide', e);
    },
  },
};
