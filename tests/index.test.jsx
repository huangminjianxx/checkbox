import React from 'react';
import { mount } from 'enzyme';
import Checkbox from '../src';

describe('rc-checkbox', () => {
  it('works', () => {
    const wrapper = mount(<Checkbox />);
    expect(wrapper.state('checked')).toBe(false);
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(wrapper.state('checked')).toBe(true);
    wrapper.find('input').simulate('change', { target: { checked: false } });
    expect(wrapper.state('checked')).toBe(false);
  });

  it('click radio', () => {
    const wrapper = mount(<Checkbox type="radio" />);
    expect(wrapper.state('checked')).toBe(false);
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(wrapper.state('checked')).toBe(true);
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(wrapper.state('checked')).toBe(true);
  });

  it('control mode', () => {
    const wrapper = mount(<Checkbox checked />);
    expect(wrapper.state('checked')).toBe(true);
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(wrapper.state('checked')).toBe(true);
    wrapper.find('input').simulate('change', { target: { checked: false } });
    expect(wrapper.state('checked')).toBe(true);
  });

  it('stopPropagation and preventDefault', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <div onChange={onChange}>
        <Checkbox
          onChange={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
        />
      </div>,
    );
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('passes data-* props to input', () => {
    const wrapper = mount(<Checkbox data-type="my-data-type" />);
    const renderedInput = wrapper.find('input').instance();
    expect(renderedInput.attributes['data-type'].value).toEqual('my-data-type');
  });

  it('passes aria-* props to input', () => {
    const wrapper = mount(<Checkbox aria-label="my-aria-label" />);
    const renderedInput = wrapper.find('input').instance();
    expect(renderedInput.attributes['aria-label'].value).toEqual('my-aria-label');
  });

  it('passes role prop to input', () => {
    // eslint-disable-next-line jsx-a11y/aria-role
    const wrapper = mount(<Checkbox role="my-role" />);
    const renderedInput = wrapper.find('input').instance();
    expect(renderedInput.attributes.role.value).toEqual('my-role');
  });

  it('passes value prop to input', () => {
    const wrapper = mount(<Checkbox value="my-custom-value" />);
    const renderedInput = wrapper.find('input').instance();
    expect(renderedInput.attributes.value.value).toEqual('my-custom-value');
  });

  it('passes number value prop to input', () => {
    const wrapper = mount(<Checkbox value={6} />);
    const renderedInput = wrapper.find('input').instance();
    expect(renderedInput.attributes.value.value).toEqual('6');
  });

  it('passes title prop to input', () => {
    const wrapper = mount(<Checkbox title="my-custom-title" />);
    const renderedInput = wrapper.find('input').instance();
    expect(renderedInput.attributes.title.value).toEqual('my-custom-title');
  });

  it('focus()', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const handleFocus = jest.fn();
    const wrapper = mount(<Checkbox onFocus={handleFocus} />, { attachTo: container });
    wrapper.instance().focus();
    expect(handleFocus).toBeCalled();
  });

  it('blur()', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const handleBlur = jest.fn();
    const wrapper = mount(<Checkbox onBlur={handleBlur} />, { attachTo: container });
    wrapper.instance().focus();
    wrapper.instance().blur();
    expect(handleBlur).toBeCalled();
  });

  it('autoFocus', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const handleFocus = jest.fn();
    mount(<Checkbox autoFocus onFocus={handleFocus} />, { attachTo: container });
    expect(handleFocus).toBeCalled();
  });

  it('onChange', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const onChange = jest.fn();
    const wrapper = mount(<Checkbox onChange={onChange} />, { attachTo: container });
    wrapper.find('input').simulate('change');
    expect(onChange).toBeCalled();
  });

  it('onChange disabled', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const onChange = jest.fn();
    const wrapper = mount(<Checkbox onChange={onChange} disabled />, { attachTo: container });
    wrapper.find('input').simulate('change');
    expect(onChange).not.toBeCalled();
  });

  it('passes required prop to input', () => {
    const wrapper = mount(<Checkbox required />);
    const renderedInput = wrapper.find('input').getDOMNode();
    expect(renderedInput.hasAttribute('required')).toBe(true);
  });

  it('onKeyDown', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const onKeyDown = jest.fn();
    const wrapper = mount(<Checkbox onKeyDown={onKeyDown} />, { attachTo: container });
    wrapper.find('input').simulate('keydown');
    expect(onKeyDown).toBeCalled();
  });

  it('onKeyPress', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const onKeyPress = jest.fn();
    const wrapper = mount(<Checkbox onKeyPress={onKeyPress} />, { attachTo: container });
    wrapper.find('input').simulate('keypress');
    expect(onKeyPress).toBeCalled();
  });

  it('onKeyUp', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const onKeyUp = jest.fn();
    const wrapper = mount(<Checkbox onKeyUp={onKeyUp} />, { attachTo: container });
    wrapper.find('input').simulate('keyup');
    expect(onKeyUp).toBeCalled();
  });

  it('has default keyboard events handler', () => {
    const onKeyDown = jest.fn();
    const onKeyPress = jest.fn();
    const onKeyUp = jest.fn();

    const wrapper = mount(
      <div onKeyDown={onKeyDown} onKeyPress={onKeyPress} onKeyUp={onKeyUp}>
        <Checkbox />
      </div>,
    );
    wrapper.find('input').simulate('keydown');
    expect(onKeyDown).toBeCalled();
    wrapper.find('input').simulate('keypress');
    expect(onKeyPress).toBeCalled();
    wrapper.find('input').simulate('keyup');
    expect(onKeyUp).toBeCalled();
  });
});
