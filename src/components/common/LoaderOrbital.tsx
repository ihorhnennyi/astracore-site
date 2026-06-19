export function LoaderOrbital() {
  return (
    <div
      className="orbital-visual relative mx-auto aspect-square w-full max-w-[15rem] sm:max-w-[17rem]"
      aria-hidden
    >
      <div className="orbital-dust absolute inset-0" />

      <div className="orbital-core-glow absolute inset-[10%] rounded-full" />
      <div className="orbital-core-flare absolute inset-[36%] rounded-full" />
      <div className="orbital-core absolute inset-[40%] rounded-full" />

      <div className="orbital-ring orbital-ring--1 absolute inset-[5%] rounded-full" />
      <div className="orbital-ring orbital-ring--2 absolute inset-[18%] rounded-full" />
      <div className="orbital-ring orbital-ring--3 absolute inset-[31%] rounded-full" />
      <div className="orbital-ring orbital-ring--4 absolute inset-[44%] rounded-full" />

      <div className="orbit-track orbit-track--outer">
        <span className="orbit-body">
          <span className="orbit-planet orbit-planet--gas">
            <span className="orbit-moon-track">
              <span className="orbit-moon" />
            </span>
          </span>
        </span>
      </div>

      <div className="orbit-track orbit-track--outer orbit-track--offset">
        <span className="orbit-body">
          <span className="orbit-planet orbit-planet--dwarf" />
        </span>
      </div>

      <div className="orbit-track orbit-track--mid orbit-track-reverse">
        <span className="orbit-body">
          <span className="orbit-planet orbit-planet--ice" />
        </span>
      </div>

      <div className="orbit-track orbit-track--inner">
        <span className="orbit-body">
          <span className="orbit-planet orbit-planet--rock" />
        </span>
      </div>

      <div className="orbital-comet absolute inset-0" />
    </div>
  )
}
