import { Link } from 'react-router-dom'
import styled from 'styled-components'
import theme from '../../styles/theme'

export let Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;

  > *:not(:last-child) {
    margin-bottom: 24px;
    width: 300px;
  }
`

export let StyledNavbar = styled.nav`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.brand.default};
  box-shadow: 0 2px 5px rgba(0,0,0,.1);
  margin-bottom: 16px;
`

export let NavbarContent = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 28px;
`

export let LogoLink = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
`

export let ButtonWrap = styled.div`
  margin-left: 28px;
`
