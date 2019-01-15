// @ts-ignore
import { isKeyHotkey } from 'is-hotkey';
import isUrl from 'is-url';
import PropTypes from 'prop-types';
import React from 'react';
import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdLink,
  MdLooksOne,
  MdLooksTwo,
} from 'react-icons/md';
import { Editor, getEventTransfer } from 'slate-react';
import {
  A,
  Blockquote,
  Button,
  Code,
  H1,
  H2,
  Ol,
  Toolbar,
  Ul,
} from './components';

const DEFAULT_NODE = 'paragraph';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

const icons = {
  bold: <MdFormatBold />,
  italic: <MdFormatItalic />,
  underlined: <MdFormatUnderlined />,
  code: <MdCode />,
  link: <MdLink />,
  'heading-one': <MdLooksOne />,
  'heading-two': <MdLooksTwo />,
  'block-quote': <MdFormatQuote />,
  'numbered-list': <MdFormatListNumbered />,
  'bulleted-list': <MdFormatListBulleted />,
};

export class TextEditor extends React.Component {
  hasMark = type => {
    const { value } = this.props;
    return value.activeMarks.some(mark => mark.type === type);
  };

  hasBlock = type => {
    const { value } = this.props;
    return value.blocks.some(node => node.type === type);
  };

  hasLinks = () => {
    const { value } = this.props;
    return value.inlines.some(inline => inline.type === 'link');
  };

  ref = editor => {
    this.editor = editor;
  };

  render() {
    return (
      <div>
        {!this.props.readOnly && (
          <Toolbar>
            {this.renderMarkButton('bold')}
            {this.renderMarkButton('italic')}
            {this.renderMarkButton('underlined')}
            {this.renderMarkButton('code')}
            {this.renderBlockButton('heading-one')}
            {this.renderBlockButton('heading-two')}
            {this.renderBlockButton('block-quote')}
            {this.renderBlockButton('numbered-list')}
            {this.renderBlockButton('bulleted-list')}
            {this.renderLinkButton('link')}
          </Toolbar>
        )}
        <Editor
          spellCheck={false}
          readOnly={this.props.readOnly}
          placeholder={this.props.placeholder}
          ref={this.ref}
          value={this.props.value}
          onChange={this.props.onChange}
          onKeyDown={this.onKeyDown}
          onPaste={this.onPaste}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />
      </div>
    );
  }

  renderMarkButton = type => {
    const isActive = this.hasMark(type);

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        {icons[type]}
      </Button>
    );
  };

  renderBlockButton = type => {
    let isActive = this.hasBlock(type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const {
        value: { document, blocks },
      } = this.props;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock('list-item') && parent && parent.type === type;
      }
    }

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        {icons[type]}
      </Button>
    );
  };

  renderLinkButton = type => {
    let isActive = this.hasLinks(type);
    return (
      <Button active={isActive} onMouseDown={this.onClickLink}>
        {icons[type]}
      </Button>
    );
  };

  renderNode = (props, _editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'block-quote':
        return <Blockquote {...attributes}>{children}</Blockquote>;
      case 'bulleted-list':
        return <Ul {...attributes}>{children}</Ul>;
      case 'heading-one':
        return <H1 {...attributes}>{children}</H1>;
      case 'heading-two':
        return <H2 {...attributes}>{children}</H2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <Ol {...attributes}>{children}</Ol>;
      case 'link': {
        const { data } = node;
        const href = data.get('href');
        return (
          <A
            {...attributes}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </A>
        );
      }
      default:
        return next();
    }
  };

  renderMark = (props, _editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <Code {...attributes}>{children}</Code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  onKeyDown = (event, editor, next) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined';
    } else if (isCodeHotkey(event)) {
      mark = 'code';
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  onClickBlock = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks('list-item').wrapBlock(type);
      }
    }
  };

  onClickLink = e => {
    e.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const hasLinks = this.hasLinks();

    if (hasLinks) {
      editor.command(unwrapLink);
    } else if (value.selection.isExpanded) {
      const href = window.prompt('Enter the URL of the link:');

      if (href === null) {
        return;
      }

      editor.command(wrapLink, href);
    } else {
      const href = window.prompt('Enter the URL of the link:');

      if (href === null) {
        return;
      }

      const text = window.prompt('Enter the text for the link:');

      if (text === null) {
        return;
      }

      editor
        .insertText(text)
        .moveFocusBackward(text.length)
        .command(wrapLink, href);
    }
  };

  onPaste = (event, editor, next) => {
    if (editor.value.selection.isCollapsed) return next();

    const transfer = getEventTransfer(event);
    const { type, text } = transfer;
    if (type !== 'text' && type !== 'html') return next();
    if (!isUrl(text)) return next();

    if (this.hasLinks()) {
      editor.command(unwrapLink);
    }

    editor.command(wrapLink, text);
  };
}

const wrapLink = (editor, href) => {
  editor.wrapInline({
    type: 'link',
    data: { href },
  });

  editor.moveToEnd();
};

const unwrapLink = editor => {
  editor.unwrapInline('link');
};

TextEditor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
};
