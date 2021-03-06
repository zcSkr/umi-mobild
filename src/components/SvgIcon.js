import React from 'react';

class SvgIcon extends React.Component {
  render() {
    const wh_json = {
      lg: { width: "36px", height: "36px" },
      md: { width: "22px", height: "22px" },
      sm: { width: "21px", height: "21px" },
      xs: { width: "18px", height: "18px" },
      xxs: { width: "15px", height: "15px" },
    }
    let wh = this.props.size ? wh_json[this.props.size] : wh_json.md
    let style = {
      fill: 'currentColor',
      backgroundSize: 'cover',
      ...wh,
      ...this.props.style,
    };
    const { type } = this.props
    return (
      <svg style={style} dangerouslySetInnerHTML={{ __html: `<use xlink:href="#${type.default.id}"></use>` }} />
    )
  }
}
export default SvgIcon;