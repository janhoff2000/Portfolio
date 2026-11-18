import { useEffect, useRef } from 'react'
import { MyReciPalPhone } from '../lib/phone'
import { useLang } from '../i18n'
import { TryHint } from './TryHint'
import { onceInView } from '../lib/onceInView'

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
    // Show once what the phone can do, the first time most of it is on screen.
    const stop = onceInView(screen.current, () => { void phone.demo() })
    return () => { stop(); phone.destroy() }
  }, [])

  return (
    <figure className="device">
      <TryHint>{t.phoneHint}</TryHint>
      <div className="iphone">
        <div className="screen">
          <div ref={screen}>
            {/* Without scripting the first screen still shows. */}
            <img src="/images/myrecipal/proto/home.webp" width={804} height={1527} alt="MyReciPal cookbook with two collections" />
          </div>
        </div>
        <img src="/images/bezel/iphone-18-pro-silver.webp" width={1350} height={2760} alt="" />
      </div>
    </figure>
  )
}
