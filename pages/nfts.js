import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/NFTGallery.module.css';

function NFTPage() {
  const [currentClass, setCurrentClass] = useState('');

  const handleClick = (newClass) => {
    setCurrentClass(styles[newClass]);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex overflow-hidden">
      <div className="w-1/2 p-4 flex flex-col">
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold mb-2 text-neon-blue text-shadow-neon-blue">Collections</h1>
          <p className="mb-2 text-xs">
            All our collections can be staked to earn daily $BUX tokens which can be cashed out for Sol from our community wallet.
          </p>
          <p className="italic mb-2 text-xs">
            Visit <span className="font-semibold">The Clubhouse</span> to stake and collect rewards
          </p>
          <Link href="https://rjctdlabs.xyz/" className="text-neon-blue hover:text-neon-pink underline text-xs">
            https://rjctdlabs.xyz/
          </Link>
        </div>
        <div className={`${styles.radioGroup} mt-auto`}>
          <input type="radio" name="rotate-cube-side" value="front" id="front" onChange={() => handleClick('showFront')} />
          <label htmlFor="front">Front</label>

          <input type="radio" name="rotate-cube-side" value="right" id="right" onChange={() => handleClick('showRight')} />
          <label htmlFor="right">Right</label>

          <input type="radio" name="rotate-cube-side" value="back" id="back" onChange={() => handleClick('showBack')} />
          <label htmlFor="back">Back</label>

          <input type="radio" name="rotate-cube-side" value="left" id="left" onChange={() => handleClick('showLeft')} />
          <label htmlFor="left">Left</label>

          <input type="radio" name="rotate-cube-side" value="top" id="top" onChange={() => handleClick('showTop')} />
          <label htmlFor="top">Top</label>

          <input type="radio" name="rotate-cube-side" value="bottom" id="bottom" onChange={() => handleClick('showBottom')} />
          <label htmlFor="bottom">Bottom</label>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center bg-surface">
        <div className={styles.scene}>
          <div className={`${styles.cube} ${currentClass}`}>
            <div className={`${styles.cubeFace} ${styles.front}`}>front</div>
            <div className={`${styles.cubeFace} ${styles.back}`}>back</div>
            <div className={`${styles.cubeFace} ${styles.right}`}>right</div>
            <div className={`${styles.cubeFace} ${styles.left}`}>left</div>
            <div className={`${styles.cubeFace} ${styles.top}`}>top</div>
            <div className={`${styles.cubeFace} ${styles.bottom}`}>bottom</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NFTPage;