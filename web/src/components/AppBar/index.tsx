import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import PublicIcon from '@mui/icons-material/Public';

import { AccountContext } from '../../utils/users/Account';

const ResponsiveAppBar = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'components.appBar' });
  const { getSession, logout } = useContext(AccountContext);
  const userEmail = useMemo(() => getSession()?.idToken.payload.email, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  const handleLogout = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PublicIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: '"Segoe UI Symbol"',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {t('title')}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem
                key="translator"
                onClick={e => {
                  e.preventDefault();
                  navigate('/translator');
                }}
              >
                <Typography textAlign="center">{t('translator')}</Typography>
              </MenuItem>
              <MenuItem
                key="repetitions"
                onClick={e => {
                  e.preventDefault();
                  navigate('/startRepetitions');
                }}
              >
                <Typography textAlign="center">{t('repetitions')}</Typography>
              </MenuItem>
              <MenuItem
                key="phrases"
                onClick={e => {
                  e.preventDefault();
                  navigate('/phrases');
                }}
              >
                <Typography textAlign="center">{t('phrases')}</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <PublicIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: '"Segoe UI Symbol"',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {t('title')}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key="translator"
              onClick={e => {
                e.preventDefault();
                navigate('/translator');
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {t('translator')}
            </Button>
            <Button
              key="repetitions"
              onClick={e => {
                e.preventDefault();
                navigate('/startRepetitions');
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {t('repetitions')}
            </Button>
            <Button
              key="phrases"
              onClick={e => {
                e.preventDefault();
                navigate('/phrases');
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {t('phrases')}
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={userEmail.toUpperCase()} src="/static/images/avatar/2.jpg" />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={t('logout')} onClick={handleLogout}>
                <Typography textAlign="center">{t('logout')}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
