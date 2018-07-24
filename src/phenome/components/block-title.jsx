import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-block-title',
  props: {
    id: [String, Number],
    ...Mixins.colorProps,
  },
  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
    } = props;

    const classes = Utils.classNames(
      className,
      'block-title',
      Mixins.colorClasses(props),
    );
    return (<div id={id} style={style} className={classes}><slot /></div>);
  },
};
