## Performance Notes

For smoother rendering:
- Use compressed VRM textures
- Keep polygon counts under ~70k tris
- Prefer WebP textures where possible
- Disable bloom on low-end GPUs

# Troubleshooting

## Avatar is invisible
- Ensure the VRM file exists in `public/models`
- Check browser console for loading errors

## No speech audio
- Some browsers require user interaction before speech synthesis works
- Verify your OS has speech voices installed

## Lip-sync not moving
- Confirm your VRM contains compatible expression/blendshape names