/* eslint import/no-unresolved: ["off"] */
/* eslint import/extensions: ["off"] */
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

import F7Badge from './badge';

export default {
  name: 'f7-list-item-content',
  props: {
    id: [String, Number],

    title: [String, Number],
    text: [String, Number],
    media: String,
    subtitle: [String, Number],
    header: [String, Number],
    footer: [String, Number],
    after: [String, Number],
    badge: [String, Number],
    badgeColor: String,
    mediaList: Boolean,
    mediaItem: Boolean,
    itemInput: Boolean,
    itemInputWithInfo: Boolean,
    inlineLabel: Boolean,

    checkbox: Boolean,
    checked: Boolean,
    defaultChecked: Boolean,
    radio: Boolean,
    name: String,
    value: [String, Number, Array],
    readonly: Boolean,
    required: Boolean,
    disabled: Boolean,
    ...Mixins.colorProps,
  },
  state() {
    return {
      hasInput: false,
      hasInlineLabel: false,
      hasInputInfo: false,
      hasInputErrorMessage: false,
    };
  },
  render() {
    const self = this;
    const props = self.props;

    const {
      id,
      className,
      style,
      radio,
      checkbox,
      value,
      name,
      checked,
      defaultChecked,
      readonly,
      disabled,
      required,
      media,
      header,
      footer,
      title,
      subtitle,
      text,
      after,
      badge,
      mediaList,
      mediaItem,
      badgeColor,
      itemInput,
      inlineLabel,
      itemInputWithInfo,
    } = props;

    let hasInput = itemInput || self.state.hasInput;
    let hasInlineLabel = inlineLabel || self.state.hasInlineLabel;
    let hasInputInfo = itemInputWithInfo || self.state.hasInputInfo;
    let hasInputErrorMessage = self.state.hasInputErrorMessage;

    const slotsContentStart = [];
    const slotsContent = [];
    const slotsContentEnd = [];
    const slotsInnerStart = [];
    const slotsInner = [];
    const slotsInnerEnd = [];
    const slotsAfterStart = [];
    const slotsAfter = [];
    const slotsAfterEnd = [];
    const slotsMedia = [];
    const slotsBeforeTitle = [];
    const slotsTitle = [];
    const slotsAfterTitle = [];
    const slotsSubtitle = [];
    const slotsText = [];
    const slotsHeader = [];
    const slotsFooter = [];

    let titleEl;
    let afterWrapEl;
    let afterEl;
    let badgeEl;
    let innerEl;
    let titleRowEl;
    let subtitleEl;
    let textEl;
    let mediaEl;
    let inputEl;
    let inputIconEl;
    let headerEl;
    let footerEl;

    const slots = self.slots.default;
    const flattenSlots = [];
    if (slots && slots.length) {
      slots.forEach((slot) => {
        if (Array.isArray(slot)) flattenSlots.push(...slot);
        else flattenSlots.push(slot);
      });
    }
    flattenSlots.forEach((child) => {
      if (typeof child === 'undefined') return;
      if (process.env.COMPILER === 'react') {
        const tag = child.type && (child.type.displayName || child.type.name);
        if (tag === 'F7Input' || tag === 'f7-input') {
          hasInput = true;
          if (child.props && child.props.info) hasInputInfo = true;
          if (child.props && child.props.errorMessage && child.props.errorMessageForce) hasInputErrorMessage = true;
        }
        if (tag === 'F7Label' || tag === 'f7-label') {
          if (child.props && child.props.inline) hasInlineLabel = true;
        }
      }
      if (process.env.COMPILER === 'vue') {
        const tag = child.tag;
        if (tag && tag.indexOf('f7-input') >= 0) {
          hasInput = true;
          if (child.data && child.data.info) hasInputInfo = true;
          if (child.data && child.data.errorMessage && child.data.errorMessageForce) hasInputErrorMessage = true;
        }
        if (tag && tag.indexOf('f7-label') >= 0) {
          if (child.data && child.data.inline) hasInlineLabel = true;
        }
      }
      let slotName;
      // phenome-vue-next-line
      slotName = child.data ? child.data.slot : undefined;
      // phenome-react-next-line
      slotName = child.props ? child.props.slot : undefined;
      if (!slotName || (slotName === 'inner')) slotsInner.push(child);
      if (slotName === 'content-start') slotsContentStart.push(child);
      if (slotName === 'content') slotsContent.push(child);
      if (slotName === 'content-end') slotsContentEnd.push(child);
      if (slotName === 'after-start') slotsAfterStart.push(child);
      if (slotName === 'after') slotsAfter.push(child);
      if (slotName === 'after-end') slotsAfterEnd.push(child);
      if (slotName === 'media') slotsMedia.push(child);
      if (slotName === 'inner-start') slotsInnerStart.push(child);
      if (slotName === 'inner-end') slotsInnerEnd.push(child);
      if (slotName === 'before-title') slotsBeforeTitle.push(child);
      if (slotName === 'title') slotsTitle.push(child);
      if (slotName === 'after-title') slotsAfterTitle.push(child);
      if (slotName === 'subtitle') slotsSubtitle.push(child);
      if (slotName === 'text') slotsText.push(child);
      if (slotName === 'header') slotsHeader.push(child);
      if (slotName === 'footer') slotsFooter.push(child);
    });

    // Input
    if (radio || checkbox) {
      if (process.env.COMPILER === 'vue') {
        inputEl = (
          <input
            name={name}
            type={radio ? 'radio' : 'checkbox'}
            domProps={{ checked, readonly, disabled, required, value }}
            onChange={self.onChange.bind(self)}
          />
        );
      } else {
        inputEl = (
          <input
            value={value}
            name={name}
            checked={checked}
            defaultChecked={defaultChecked}
            readOnly={readonly}
            disabled={disabled}
            required={required}
            type={radio ? 'radio' : 'checkbox'}
            onChange={self.onChange.bind(self)}
          />
        );
      }

      inputIconEl = (
        <i className={`icon icon-${radio ? 'radio' : 'checkbox'}`} />
      );
    }
    // Media
    if (media || slotsMedia.length) {
      let mediaImgEl;
      if (media) {
        mediaImgEl = (
          <img src={media} />
        );
      }
      mediaEl = (
        <div className="item-media">
          {mediaImgEl}
          {slotsMedia}
        </div>
      );
    }
    // Inner Elements
    const isMedia = mediaItem || mediaList;

    if (header || slotsHeader.length) {
      headerEl = (
        <div className="item-header">
          {header}
          {slotsHeader}
        </div>
      );
    }
    if (footer || slotsFooter.length) {
      footerEl = (
        <div className="item-footer">
          {footer}
          {slotsFooter}
        </div>
      );
    }
    if (title || slotsTitle.length || (!isMedia && headerEl) || (!isMedia && footerEl)) {
      titleEl = (
        <div className="item-title">
          {!isMedia && headerEl}
          {title}
          {slotsTitle}
          {!isMedia && footerEl}
        </div>
      );
    }
    if (subtitle || slotsSubtitle.length) {
      subtitleEl = (
        <div className="item-subtitle">
          {subtitle}
          {slotsSubtitle}
        </div>
      );
    }
    if (text || slotsText.length) {
      textEl = (
        <div className="item-text">
          {text}
          {slotsText}
        </div>
      );
    }
    if (after || badge || slotsAfter.length) {
      if (after) {
        afterEl = <span>{after}</span>;
      }
      if (badge) {
        badgeEl = <F7Badge color={badgeColor}>{badge}</F7Badge>;
      }
      afterWrapEl = (
        <div className="item-after">
          {slotsAfterStart}
          {afterEl}
          {badgeEl}
          {slotsAfter}
          {slotsAfterEnd}
        </div>
      );
    }
    if (isMedia) {
      titleRowEl = (
        <div className="item-title-row">
          {slotsBeforeTitle}
          {titleEl}
          {slotsAfterTitle}
          {afterWrapEl}
        </div>
      );
      innerEl = (
        <div ref="innerEl" className="item-inner">
          {slotsInnerStart}
          {headerEl}
          {titleRowEl}
          {subtitleEl}
          {textEl}
          {slotsInner}
          {footerEl}
          {slotsInnerEnd}
        </div>
      );
    } else {
      innerEl = (
        <div ref="innerEl" className="item-inner">
          {slotsInnerStart}
          {slotsBeforeTitle}
          {titleEl}
          {slotsAfterTitle}
          {afterWrapEl}
          {slotsInner}
          {slotsInnerEnd}
        </div>
      );
    }

    // Finalize
    const ItemContentTag = checkbox || radio ? 'label' : 'div';

    const classes = Utils.classNames(
      className,
      'item-content',
      {
        'item-checkbox': checkbox,
        'item-radio': radio,
        'item-input': hasInput,
        'inline-label': hasInlineLabel,
        'item-input-with-info': hasInputInfo,
        'item-input-with-error-message': hasInputErrorMessage,
        'item-input-invalid': hasInputErrorMessage,
      },
      Mixins.colorClasses(props),
    );
    return (
      <ItemContentTag
        ref="el"
        id={id}
        style={style}
        className={classes}
        onClick={self.onClick.bind(self)}
      >
        {slotsContentStart}
        {inputEl}
        {inputIconEl}
        {mediaEl}
        {innerEl}
        {slotsContent}
        {slotsContentEnd}
      </ItemContentTag>
    );
  },
  componentWillMount() {
    this.checkHasInputState();
  },
  componentWillUpdate() {
    this.checkHasInputState();
  },
  componentDidMount() {
    const self = this;
    const innerEl = self.refs.innerEl;
    if (!innerEl) return;
    const $innerEl = self.$$(innerEl);
    const $labelEl = $innerEl.children('.item-title.item-label');
    const $inputEl = $innerEl.children('.item-input-wrap');
    const hasInlineLabel = $labelEl.hasClass('item-label-inline');
    const hasInput = $inputEl.length > 0;
    const hasInputInfo = $inputEl.children('.item-input-info').length > 0;
    const hasInputErrorMessage = $inputEl.children('.item-input-error-message').length > 0;
    if (!self.hasInlineLabelSet && hasInlineLabel !== self.state.hasInlineLabel) {
      self.setState({ hasInlineLabel });
    }
    if (!self.hasInputSet && hasInput !== self.state.hasInput) {
      self.setState({ hasInput });
    }
    if (!self.hasInputInfoSet && hasInputInfo !== self.state.hasInputInfo) {
      self.setState({ hasInputInfo });
    }
    if (!self.hasInputErrorMessageSet && hasInputErrorMessage !== self.state.hasInputErrorMessage) {
      self.setState({ hasInputErrorMessage });
    }
  },
  componentDidUpdate() {
    const self = this;
    const innerEl = self.refs.innerEl;
    if (!innerEl) return;
    const $innerEl = self.$$(innerEl);
    const $labelEl = $innerEl.children('.item-title.item-label');
    const $inputEl = $innerEl.children('.item-input-wrap');
    const hasInlineLabel = $labelEl.hasClass('item-label-inline');
    const hasInput = $inputEl.length > 0;
    const hasInputInfo = $inputEl.children('.item-input-info').length > 0;
    const hasInputErrorMessage = $inputEl.children('.item-input-error-message').length > 0;
    if (hasInlineLabel !== self.state.hasInlineLabel) {
      self.setState({ hasInlineLabel });
    }
    if (hasInput !== self.state.hasInput) {
      self.setState({ hasInput });
    }
    if (hasInputInfo !== self.state.hasInputInfo) {
      self.setState({ hasInputInfo });
    }
    if (!self.hasInputErrorMessageSet && hasInputErrorMessage !== self.state.hasInputErrorMessage) {
      self.setState({ hasInputErrorMessage });
    }
  },
  methods: {
    checkHasInputState() {
      const self = this;
      const props = self.props;
      const {
        itemInput,
        inlineLabel,
        itemInputWithInfo,
      } = props;
      const hasInput = itemInput || self.state.hasInput;
      const hasInlineLabel = inlineLabel || self.state.hasInlineLabel;
      const hasInputInfo = itemInputWithInfo || self.state.hasInputInfo;
      const hasInputErrorMessage = self.state.hasInputErrorMessage;
      if (hasInput && !self.state.hasInput) {
        self.hasInputSet = true;
        self.setState({ hasInput });
      } else if (!hasInput) {
        self.hasInputSet = false;
      }
      if (hasInputInfo && !self.state.hasInputInfo) {
        self.hasInputInfoSet = true;
        self.setState({ hasInputInfo });
      } else if (!hasInputInfo) {
        self.hasInputInfoSet = false;
      }
      if (hasInputErrorMessage && !self.state.hasInputErrorMessage) {
        self.hasInputErrorMessageSet = true;
        self.setState({ hasInputErrorMessage });
      } else if (!hasInputInfo) {
        self.hasInputErrorMessageSet = false;
      }
      if (hasInlineLabel && !self.state.hasInlineLabel) {
        self.hasInlineLabelSet = true;
        self.setState({ hasInlineLabel });
      } else if (!hasInlineLabel) {
        self.hasInlineLabelSet = false;
      }
    },
    onClick(event) {
      this.dispatchEvent('click', event);
    },
    onChange(event) {
      this.dispatchEvent('change', event);
    },
  },
};
