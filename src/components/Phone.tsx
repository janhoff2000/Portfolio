import { useEffect, useRef } from 'react'
import { MyReciPalPhone } from '../lib/phone'
import { useLang } from '../i18n'

export function Phone() {
  const { t } = useLang()
  const screen = useRef<HTMLDivElement>(null)
  const toast = useRef(t.settingsToast)
  useEffect(() => { toast.current = t.settingsToast }, [t.settingsToast])

  useEffect(() => {
    if (!screen.current) return
    const phone = new MyReciPalPhone(screen.current, {
      base: '/images/myrecipal/proto/',
      label: 'MyReciPal',
      toast: () => toast.current,
    })
    return () => phone.destroy()
  }, [])

  return (
    <figure className="device">
      <div className="iphone">
        <div className="screen">
          <div ref={screen}>
            {/* Without scripting the first screen still shows. */}
            <img src="/images/myrecipal/proto/home.webp" width={804} height={1527} alt="MyReciPal cookbook with two collections" />
          </div>
        </div>
        <img src="/images/bezel/iphone-18-pro-silver.webp" width={1350} height={2760} alt="" />
      </div>
      <figcaption className="hint">{t.phoneHint}</figcaption>
    </figure>
  )
}
